import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { clerkClient } from "@clerk/nextjs/server"
import { supabase } from "@/lib/supabaseClient"

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const csvFile = formData.get("csvFile") as File | null

    if (!csvFile) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (csvFile.type !== "text/csv") {
      return NextResponse.json({ error: "File must be a CSV" }, { status: 400 })
    }

    const csvText = await csvFile.text()
    const lines = csvText.split("\n").filter(line => line.trim())
    
    if (lines.length < 2) {
      return NextResponse.json({ error: "CSV must contain at least a header and one data row" }, { status: 400 })
    }

    const headers = lines[0]?.split(",").map(h => h.trim().replace(/"/g, "")) || []
    const requiredHeaders = ["email", "firstName", "lastName"]
    
    const missingHeaders = requiredHeaders.filter(h => !headers.includes(h))
    if (missingHeaders.length > 0) {
      return NextResponse.json({ 
        error: `Missing required headers: ${missingHeaders.join(", ")}` 
      }, { status: 400 })
    }

    const users = []
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i]?.split(",").map(v => v.trim().replace(/"/g, "")) || []
      
      if (values.length < headers.length) {
        continue
      }

      const user: any = {}
      headers.forEach((header, index) => {
        user[header] = values[index] ?? ""
      })

      if (!user.email || !user.firstName || !user.lastName) {
        continue
      }

      users.push(user)
    }

    if (users.length === 0) {
      return NextResponse.json({ error: "No valid user data found in CSV" }, { status: 400 })
    }

    const createdUsers = []
    const errors = []

    for (const user of users) {
      try {
        const clerkUser = await (await clerkClient()).users.createUser({
          emailAddress: [user.email],
          firstName: user.firstName,
          lastName: user.lastName,
          skipPasswordChecks: true,
        })

        const { data, error } = await supabase
          .from('users')
          .insert({
            clerk_id: clerkUser.id,
            email: user.email,
            first_name: user.firstName,
            last_name: user.lastName,
            role: 'coach',
            club_id: user.club_id || null,
          })
          .select()

        if (error) {
          console.error(`Error creating Supabase user record for ${user.email}:`, error)
          errors.push({
            email: user.email,
            error: `Failed to create database record: ${error.message}`,
          })
        } else {
          createdUsers.push({
            clerkId: clerkUser.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            clubId: user.club_id || null,
            supabaseId: data[0]?.id,
          })
        }
      } catch (error) {
        console.error(`Error creating user ${user.email}:`, error)
        errors.push({
          email: user.email,
          error: error instanceof Error ? error.message : "Unknown error",
        })
      }
    }

    return NextResponse.json({ 
      message: "Import completed", 
      createdUsers,
      errors,
      createdCount: createdUsers.length,
      errorCount: errors.length,
      totalCount: users.length
    })

  } catch (error) {
    console.error("Error parsing CSV:", error)
    return NextResponse.json({ error: "Failed to parse CSV" }, { status: 500 })
  }
}
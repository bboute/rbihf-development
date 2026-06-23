import { PortableTextComponents } from "@portabletext/react"

export const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-6 mt-8 first:mt-0">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold mb-4 mt-8 first:mt-0">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mb-3 mt-6 first:mt-0">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold mb-2 mt-6 first:mt-0">{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-lg font-semibold mb-2 mt-4 first:mt-0">{children}</h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-base font-semibold mb-2 mt-4 first:mt-0">{children}</h6>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 my-6 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="pl-2">{children}</li>
    ),
    number: ({ children }) => (
      <li className="pl-2">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }) => (
      <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') 
        ? '_blank' 
        : undefined
      const rel = target === '_blank' ? 'noopener noreferrer' : undefined
      
      return (
        <a
          href={value?.href}
          target={target}
          rel={rel}
          className="text-primary hover:underline underline-offset-4 transition-colors"
        >
          {children}
        </a>
      )
    },
  },
}
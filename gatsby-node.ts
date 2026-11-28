const path = require("path")
const postTemplate = path.resolve(`./src/templates/post.tsx`)

const MONTHS = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
}

// Normalize a free-text frontmatter date into YYYY-MM-DD for sorting, or null.
// Accepts "ddd, D MMM YYYY" (current format) and "YYYY-MM-DD".
function parseDateSort(value) {
  if (typeof value !== "string") return null
  const s = value.trim()

  // ISO 8601: 2026-09-28
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s)
  if (iso) return `${iso[1]}-${iso[2]}-${iso[3]}`

  // RFC-ish: [Day,] D Mon YYYY  e.g. "Mon, 28 Sep 2026"
  const rfc = /^(?:\w{3},\s+)?(\d{1,2})\s+(\w{3})\s+(\d{4})$/.exec(s)
  if (rfc) {
    const month = MONTHS[rfc[2]]
    if (month !== undefined) {
      const day = String(rfc[1]).padStart(2, "0")
      return `${rfc[3]}-${String(month + 1).padStart(2, "0")}-${day}`
    }
  }

  return null
}

// Rough reading time in minutes from the raw MDX body (frontmatter stripped).
function computeTimeToRead(rawBody) {
  if (typeof rawBody !== "string") return null
  const body = rawBody.replace(/^---[\s\S]*?---\s*/, "").trim()
  const words = body ? body.split(/\s+/).filter(Boolean).length : 0
  return Math.max(1, Math.ceil(words / 200))
}

exports.onCreateNode = ({ node, actions }) => {
  if (node.internal.type !== "Mdx") return

  const dateSort = parseDateSort(node.frontmatter && node.frontmatter.date)
  if (dateSort) {
    actions.createNodeField({ node, name: "dateSort", value: dateSort })
  }

  const timeToRead = computeTimeToRead(node.rawBody)
  if (timeToRead !== null) {
    actions.createNodeField({ node, name: "timeToRead", value: timeToRead })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMdx(sort: { fields: [fields___dateSort, frontmatter___title], order: [DESC, ASC] }) {
        nodes {
          id
          frontmatter {
            slug
            title
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild("Error loading MDX result", result.errors)
  }

  const posts = result.data.allMdx.nodes

  posts.forEach((node, i) => {
    createPage({
      path: `content/${node.frontmatter.slug}`,
      component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        id: node.id,
        newer: i > 0 ? { slug: posts[i - 1].frontmatter.slug, title: posts[i - 1].frontmatter.title } : null,
        older: i < posts.length - 1 ? { slug: posts[i + 1].frontmatter.slug, title: posts[i + 1].frontmatter.title } : null,
      },
    })
  })
}

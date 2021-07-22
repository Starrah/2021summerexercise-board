export interface Post {
    id: number,
    username: string,
    timestamp: number,
    content: string
}

let count = 0

export function getAndIncreaseCount() {
    return count++
}

export const posts: Record<number, Post> = {}
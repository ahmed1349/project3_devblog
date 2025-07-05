
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    bio: string;
  };
  publishedAt: string;
  readingTime: number;
  tags: string[];
  category: string;
  views: number;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'getting-started-with-react-18',
    title: 'Getting Started with React 18: New Features and Improvements',
    excerpt: 'Explore the latest features in React 18 including concurrent rendering, automatic batching, and new hooks that will revolutionize your development workflow.',
    content: `# Getting Started with React 18: New Features and Improvements

React 18 brings exciting new features that enhance performance and developer experience. Let's dive into the most important updates.

## Concurrent Rendering

The biggest change in React 18 is the introduction of concurrent rendering. This allows React to pause, resume, and abandon rendering work as needed.

\`\`\`jsx
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
\`\`\`

## Automatic Batching

React 18 automatically batches all state updates, even those inside promises, timeouts, and native event handlers.

\`\`\`jsx
function handleClick() {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React will only re-render once at the end (that's batching!)
}
\`\`\`

## New Hooks

### useId
The useId hook generates unique IDs that are stable across server and client rendering.

\`\`\`jsx
function Checkbox() {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>Do you like React?</label>
      <input id={id} type="checkbox" name="react"/>
    </>
  );
}
\`\`\`

### useDeferredValue
This hook lets you defer updating part of the UI.

\`\`\`jsx
function SearchPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  
  const searchResults = useMemo(() => 
    searchData(deferredQuery), [deferredQuery]
  );
  
  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <SearchResults query={deferredQuery} results={searchResults} />
    </div>
  );
}
\`\`\`

## Conclusion

React 18 provides powerful new tools for building faster, more responsive applications. The concurrent features open up new possibilities for optimizing user experience.`,
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    author: {
      id: 'sarah-johnson',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      bio: 'Senior Frontend Developer with 8+ years of experience in React and modern web technologies.'
    },
    publishedAt: '2024-01-01',
    readingTime: 8,
    tags: ['React', 'JavaScript', 'Frontend'],
    category: 'Frontend Development',
    views: 1245
  },
  {
    id: '2',
    slug: 'mastering-typescript-advanced-patterns',
    title: 'Mastering TypeScript: Advanced Patterns and Best Practices',
    excerpt: 'Deep dive into advanced TypeScript patterns including conditional types, mapped types, and utility types that will make your code more robust and maintainable.',
    content: `# Mastering TypeScript: Advanced Patterns and Best Practices

TypeScript offers powerful type system features that can make your code more robust and maintainable. Let's explore some advanced patterns.

## Conditional Types

Conditional types allow you to create types that change based on conditions.

\`\`\`typescript
type ApiResponse<T> = T extends string 
  ? { message: T } 
  : { data: T };

type StringResponse = ApiResponse<string>; // { message: string }
type NumberResponse = ApiResponse<number>; // { data: number }
\`\`\`

## Mapped Types

Mapped types allow you to create new types by transforming properties of existing types.

\`\`\`typescript
type Optional<T> = {
  [P in keyof T]?: T[P];
};

type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Optional<User>; // All properties are optional
type ReadonlyUser = Readonly<User>; // All properties are readonly
\`\`\`

## Utility Types

TypeScript provides several built-in utility types for common transformations.

\`\`\`typescript
// Pick specific properties
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit specific properties
type CreateUser = Omit<User, 'id'>;

// Make all properties required
type RequiredUser = Required<Partial<User>>;

// Create union of property names
type UserKeys = keyof User; // 'id' | 'name' | 'email'
\`\`\`

## Template Literal Types

Template literal types allow you to create new string literal types.

\`\`\`typescript
type EventName<T extends string> = \`on\${Capitalize<T>}\`;

type ButtonEvents = EventName<'click' | 'hover'>; // 'onClick' | 'onHover'
\`\`\`

## Advanced Function Types

Create flexible function signatures with overloads and generic constraints.

\`\`\`typescript
function process<T extends string | number>(
  value: T
): T extends string ? string : number;
function process(value: string | number) {
  return typeof value === 'string' ? value.toUpperCase() : value * 2;
}

const stringResult = process('hello'); // Type: string
const numberResult = process(42); // Type: number
\`\`\`

## Conclusion

These advanced TypeScript patterns provide powerful tools for creating type-safe, maintainable code. Practice incorporating them into your projects gradually.`,
    coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
    author: {
      id: 'alex-chen',
      name: 'Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      bio: 'Full-stack developer passionate about type-safe programming and developer tooling.'
    },
    publishedAt: '2024-01-02',
    readingTime: 12,
    tags: ['TypeScript', 'JavaScript', 'Programming'],
    category: 'Programming',
    views: 987
  },
  {
    id: '3',
    slug: 'building-scalable-apis-with-nodejs',
    title: 'Building Scalable APIs with Node.js and Express',
    excerpt: 'Learn how to design and build scalable REST APIs using Node.js, Express, and modern best practices for performance, security, and maintainability.',
    content: `# Building Scalable APIs with Node.js and Express

Building scalable APIs requires careful consideration of architecture, performance, and maintainability. Here's a comprehensive guide.

## Project Structure

A well-organized project structure is crucial for scalability:

\`\`\`
src/
  controllers/
  middleware/
  models/
  routes/
  services/
  utils/
  config/
  tests/
\`\`\`

## Setting Up Express with TypeScript

\`\`\`typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
\`\`\`

## Error Handling Middleware

\`\`\`typescript
interface ApiError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode = 500, message } = err;
  
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message: process.env.NODE_ENV === 'production' 
      ? 'Something went wrong!' 
      : message
  });
};

app.use(errorHandler);
\`\`\`

## Database Integration with Prisma

\`\`\`typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// User service
export class UserService {
  async createUser(userData: CreateUserData) {
    return await prisma.user.create({
      data: userData,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    });
  }

  async getUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        posts: true
      }
    });
  }
}
\`\`\`

## Validation with Zod

\`\`\`typescript
import { z } from 'zod';

const createUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    name: z.string().min(2).max(50),
    password: z.string().min(8)
  })
});

const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params
      });
      next();
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: error.errors
      });
    }
  };
};
\`\`\`

## Caching Strategy

\`\`\`typescript
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

const cacheMiddleware = (duration: number) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const key = req.originalUrl;
    const cached = await redis.get(key);
    
    if (cached) {
      return res.json(JSON.parse(cached));
    }
    
    const originalSend = res.json;
    res.json = function(data) {
      redis.setex(key, duration, JSON.stringify(data));
      return originalSend.call(this, data);
    };
    
    next();
  };
};
\`\`\`

## Testing Strategy

\`\`\`typescript
import request from 'supertest';
import app from '../src/app';

describe('POST /api/users', () => {
  it('should create a new user', async () => {
    const userData = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password123'
    };

    const response = await request(app)
      .post('/api/users')
      .send(userData)
      .expect(201);

    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.email).toBe(userData.email);
  });
});
\`\`\`

## Performance Optimization

1. **Database Indexing**: Ensure proper database indexes
2. **Connection Pooling**: Use connection pools for database
3. **Compression**: Enable gzip compression
4. **Monitoring**: Implement logging and monitoring

## Conclusion

Building scalable APIs requires attention to structure, security, performance, and testing. Follow these patterns for maintainable, robust applications.`,
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
    author: {
      id: 'mike-rodriguez',
      name: 'Mike Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      bio: 'Backend architect with expertise in Node.js, microservices, and cloud infrastructure.'
    },
    publishedAt: '2024-01-03',
    readingTime: 15,
    tags: ['Node.js', 'Express', 'Backend', 'API'],
    category: 'Backend Development',
    views: 2156
  }
];

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => 
    post.category.toLowerCase() === category.toLowerCase()
  );
};

export const getPostsByTag = (tag: string): BlogPost[] => {
  return blogPosts.filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
};

export const searchPosts = (query: string): BlogPost[] => {
  const lowercaseQuery = query.toLowerCase();
  return blogPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getCategories = (): string[] => {
  return Array.from(new Set(blogPosts.map(post => post.category)));
};

export const getAllTags = (): string[] => {
  return Array.from(new Set(blogPosts.flatMap(post => post.tags)));
};

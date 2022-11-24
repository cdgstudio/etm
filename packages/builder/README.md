# @codegen/etm-builder

## Installation

Install library and with all peer dependencies

```bash
npm i @codegen/etm-builder
```

```bash
npm i react react-dom styled-components
```

If you use TypeScript do not forget installing types:

```bash
npm i @types/react @types/react-dom @types/styled-components
```

## Usage

### 1. Create file structure

```
.
├── package.json
├── templates
│   ├── ...
└── tsconfig.json

```

### 2. Create example template

Create `Example.tsx` with default export

```
└── templates
    └── Example.tsx
```

```tsx
import styled from 'styled-components';
import { ApiProperty } from '@nestjs/swagger';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

class ExampleInput {
  @ApiProperty({
    description: 'Login of user',
    type: String,
  })
  login!: string;
}

export Params = ExampleInput;

export default function (input: ExampleInput) {
  return (
    <BaseLayout>
      <Title>Hello {input.login}</Title>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tempor
        finibus libero, ut varius nisl euismod eget. Aliquam fermentum eleifend
        ornare. Morbi cursus elementum lacus.
      </p>

      <Signature />
    </BaseLayout>
  );
}

function BaseLayout({ children }: any) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>{children}</body>
    </html>
  );
}

function Signature() {
  return (
    <>
      <p>best regards</p>
    </>
  );
}
```

### 3. Render to HTML

All files in `templates` will be rendered to `dist` dictionary as ready React components

```bash
npx etm
```

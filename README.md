# @polym/react-props

## install

```
npm install --save-dev @polym/react-props
```

or

```
yarn add -D @polym/react-props
```

## Usage

### props definition tool

```ts
import {
  getDefaultProps,
  getPropType,
  NotRequired,
  Required
} from '@polym/react-props'

const appearFromOptions = ['bottom', 'right'] as const
type AppearFromOptions = typeof appearFromOptions[number]

/* config object */
const conf = {
  /* Required<T extends string | number | boolean | bigint | null | undefined>() */
  startHeight: Required<number>(),
  /* NotRequired<T extends string | number | boolean | bigint | null | undefined>(DEFAULT_VALUE) */
  appearFrom: NotRequired<AppearFromOptions>('bottom')
}

/* Get the type of all props */
type PropType = getPropType<typeof conf>

/* Get default value object for all props */
const defaultProps = getDefaultProps<PropType>(conf)
```

Centralize the props information (type, default value, and whether it is required or not) in a configuration object.

Through `getPropType` and `getDefaultProps`, type and default value objects can be obtained.
Make them variable and you can use them anywhere!

```ts
/* Example: Expand to function component arguments */

const MyComponent = ({ ...props }: PropType = { ...defaultProps }) => {
  return <div>Hello World</div>
}
```

```ts
/* Example: Use within a story definition in a storybook */

const Template: ComponentStory<typeof MyComponent> = ({ ...args }) => (
  <MyComponent {...args} />
)

export const sample01 = Template.bind({})
sample01.args = {
  ...defaultProps // Expand default value object as is
}
```

#### SORRY

At present, if you define props with types other than `T extends string | number | boolean | bigint | null | undefined`, you need to describe them separately.

```ts
import {
  getDefaultProps,
  getPropType,
  NotRequired,
  Required
} from '@polym/react-props'

const conf = {
  width: NotRequired<number>(150),
  disabled: Required<boolean>(),
  value: Required<string | null>()
}

type PropType = getPropType<typeof conf> & {
  onChange?: (value: string) => void
}

const defaultProps = {
  ...getDefaultProps<PropType>(conf),
  onChange: (value: string) => console.log(value)
}
```

### Component type with `as` props

`as` props is one of the methods to increase the versatility of components.

If an HTML tag name is specified, the component will be rendered as the specified HTML element.

If a React component (or StyledComponent) is specified, the functionality and style of the specified component can be added.

#### `PolymorphicComponentProp` or `PolymorphicComponentPropWithRef`

Using these types in the type definition of props allows for type-safe implementation of components with `as` props.

Specifically, it is possible to implement components that change the type of props and `ref` that can be specified for the component, depending on `as` props.

```ts
import { ElementType, forwardRef, ReactElement } from 'react'
import { PolymorphicComponentPropWithRef } from '@polym/react-props'

type MyComponentProps<As extends ElementType> = PolymorphicComponentPropWithRef<
  As,
  OtherProps
>

type MyComponentType = <As extends ElementType>(
  props: MyComponentProps<As>
) => ReactElement | null

const MyComponentInner = <As extends ElementType>({
  as,
  children,
  ref,
  ...props
}: MyComponentProps<As>) => {
  return (
    <MyInnerComponent {...props} ref={ref} as={as || 'div'}>
      {children}
    </MyInnerComponent>
  )
}

export const MyComponent: MyComponentType = forwardRef(MyComponentInner)
```

##### WARNING

You cannot control the HTML tag names that can be specified for `as` props.

For example, if you specify 'img' for `as` in a component with child elements, it will crash at runtime.

`as` props should be implemented with caution.

### Utility for style control props

```ts
import { CSSt, NotRequired } from '@polym/react-props'

const conf = {
  borderWidthValue: NotRequired<number>(1),
  borderWidthUnit: NotRequired<CSSt.Unit.Length>('px')
}
```

## Developer

**tomixy** is a female engineer living in Japan.

- [Biography Site](https://tetracalibers.notion.site/tomixy-TetraCalibers-30b94fb9fc054d4da667539ef35f42c6)
- [Twitter](https://twitter.com/tetracalibers)

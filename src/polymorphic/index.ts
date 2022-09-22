import type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  PropsWithChildren
} from 'react'
import type {
  AnyStyledComponent,
  StyledComponentInnerComponent
} from 'styled-components'

export type PolymorphicRef<C extends ElementType> =
  ComponentPropsWithRef<C>['ref']

type AsProp<C extends ElementType> = {
  as?: C
}

type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P)

export type PolymorphicComponentProp<
  C extends ElementType,
  Props = {}
> = PropsWithChildren<Props & AsProp<C>> &
  Omit<
    ComponentPropsWithoutRef<
      C extends AnyStyledComponent ? StyledComponentInnerComponent<C> : C
    >,
    PropsToOmit<C, Props>
  >

export type PolymorphicComponentPropWithRef<
  C extends ElementType,
  Props = {}
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> }

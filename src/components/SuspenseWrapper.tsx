import { JSX, Suspense } from 'react'

interface Props {
  /**
   * The lazy-loaded component to wrap
   */
  Component: React.LazyExoticComponent<React.FC>
  /**
   * Optional custom fallback UI to display while the component is loading
   * @default <div>Loading...</div>
   */
  fallback?: JSX.Element
}

/**
 * A wrapper component that adds suspense around a lazy-loaded component.
 * @param Component The lazy-loaded component to wrap
 * @param fallback The fallback UI to display while the component is loading
 * @returns The wrapped component inside Suspense
 */
export const SuspenseWrapper: React.FC<Props> = ({
  Component,
  fallback = <div>Loading...</div>,
}) => (
  <Suspense fallback={fallback}>
    <Component />
  </Suspense>
)

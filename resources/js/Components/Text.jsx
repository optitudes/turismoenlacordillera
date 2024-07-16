export default function Text({ className, children, as }) {
  const Component = as || 'div'
  return (
  <Component className={className}>{children}</Component>
  )
}   
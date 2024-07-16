export default function List({ className, children, ...rest }) {
  return (
  <>
   <li className={className} {...rest}>{children}</li>
  </>
  )
}   
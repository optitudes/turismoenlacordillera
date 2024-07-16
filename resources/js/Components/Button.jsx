export default function Button({ className, children, ...rest }) {
    return (
     <button {...rest} className={className}>{children}</button>
    )
   }   
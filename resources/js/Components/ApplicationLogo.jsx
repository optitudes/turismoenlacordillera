
import Logo from "@/Assets/logo1.png"
import Colors from "@/Constants/Colors.js"

export default function ApplicationLogo(props) {
    return (
        <img 
        src={Logo}  
        className="w-full h-full rounded-lg" 
        style={{ backgroundColor: Colors.primarydark }} 
    />
    );
}

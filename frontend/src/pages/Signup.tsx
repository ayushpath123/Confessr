import Auth from "../components/Auth"
import Quote from "../components/Quote"
function Signup() {
  return (
    <>
     <div className="grid grid-cols-1 lg:grid lg:grid-cols-2">
        <div><Auth types="signup"></Auth></div>
        <div className="hidden lg:block"><Quote></Quote></div>
     </div>
    </>
    
  )
}

export default Signup
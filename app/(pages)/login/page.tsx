export default function login() {
    return (
      <div className="h-screen w-screen bg-cover bg-no-repeat bg-login-bg flex justify-center items-center m-0">
        <div className="bg-white h-[600px] w-[550px] border-solid border-[1px] border-[#D9D9D9] rounded-[10px] flex justify-center">
          <div className="pt-[70px] h-[120px] w-full flex flex-col justify-center items-center">
            <h1 className="text-4xl"><b><span className="text-[#61DADA]">Welcome</span> to Cricket</b></h1>
            <div className="text-center text-[15px] pt-2 leading-tight">
              <p>Catch every issue, everytime. </p>
              <p>Login to your account or contact the admin for</p>
              <p>account creation.</p>
            </div>
          </div>

          <div className="">
            {/**FORM HERE **/}
          </div>
        </div>
      </div>
    );
  }
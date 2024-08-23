import { FaSpinner } from "react-icons/fa";

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen lg:h-[calc(100vh-222px)]">
          <div className="spinner-border text-primary" role="status">
            <FaSpinner className="h-7 w-7"/>
          </div>
        </div>
      );
};

export default Loader;
import { useNavigation } from "react-router-dom";

const SubmitButton = ({ text }) => {
  const navigation = useNavigation();
  const isSubmitting = (navigation.state === "submitting");

  return (
    <button
      disabled={isSubmitting}
      type="submit"
      className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
    >
      {isSubmitting ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : (
        text || "submit"
      )}
    </button>
  );
};

export default SubmitButton;

import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="bg-white fixed bottom-0  w-screen text-white text-center py-4 border-t border-black z-10">
        <p className="text-xl font-semibold text-gray-700">
            Business. Legalities. Accounts.
        </p>
        <a 
          href="https://wa.me/+919790813661?text=Hey!"
          target="_blank"
          className="fixed bottom-6 max-md:bottom-[36px] max-md:right-2 right-6 bg-green-500 text-white p-4 max-md:p-2 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 z-50"
        >
          <FaWhatsapp className="h-12 w-12 max-md:h-10 max-md:w-10" />
        </a>
    </div>
  )
}
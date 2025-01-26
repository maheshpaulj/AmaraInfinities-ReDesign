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
          className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 z-50"
        >
          <FaWhatsapp size={48} />
        </a>
    </div>
  )
}
import Image from "next/image";
import whatsappDP from "../../assets/whatsapp_dp.jpg";



export default function AvatarGroup() {
    const users = [
  { name: 'A', img: whatsappDP},
  { name: 'H', img: '', color: 'bg-blue-400' },
  { name: 'R', img: '', color: 'bg-amber-300' },
  { name: 'D', img: whatsappDP },
  { name: '', img: whatsappDP },
];
  return (
    <div className="flex items-center space-x-[-10px]">
      {users.map((user, i) => (
        <div key={i} className="relative w-8 h-8 rounded-full border-2 border-white">
          {user.img ? (
            <Image
              src={user.img}
              alt={user.name}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div
              className={`w-full h-full rounded-full flex items-center justify-center text-white font-bold text-sm ${
                user.color || 'bg-gray-400'
              }`}
            >
              {user.name}
            </div>
          )}
          {/* Online Indicator */}
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
      ))}

      {/* "+3" bubble */}
      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium border-2 border-white">
        +3
      </div>
    </div>
  );
}
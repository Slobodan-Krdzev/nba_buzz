"use client";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { UserProfile } from "@/app/Types/Types";

interface UserCardProps {
  user: UserProfile;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <section className="w-full bg-white rounded-2xl shadow-custom-white-light p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-2 ring-accentLight">
          <Image
            src={user.imageUrl}
            alt={`${user.firstName} ${user.lastName}`}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-black text-titles tracking-tight">
            {user.firstName} {user.lastName}
          </h1>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-titles">
              <Mail className="w-4 h-4 text-accent" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-titles">
              <Phone className="w-4 h-4 text-accent" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-titles sm:col-span-2">
              <MapPin className="w-4 h-4 text-accent" />
              <span>{user.address}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



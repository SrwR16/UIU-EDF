// src/components/leadership/MemberCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Twitter, Calendar, History, Award } from 'lucide-react';

export interface PreviousRole {
  role: string;
  department: string;
  term: string;
}

export interface Member {
  name: string;
  role: string;
  department: string;
  position: number;
  image: string;
  bio: string;
  term: string;
  status: string;
  previousRoles: PreviousRole[];
  achievements: string[];
  contact: {
    email: string;
    linkedin: string;
    twitter: string;
  };
}

interface MemberCardProps {
  member: Member;
  index: number;
  getDepartmentName: (deptId: string) => string;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, index, getDepartmentName }) => {
  return (
    <motion.div
      key={member.name}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:scale-105 group"
    >
      <div className="flex flex-col h-full">
        {/* Card Header */}
        <div className="relative h-48">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-600 to-black opacity-90 group-hover:opacity-100 transition-opacity" />
          
          {/* Profile Image */}
          <div className="absolute -bottom-12 left-6">
            <div className="w-24 h-24 rounded-xl border-4 border-white shadow-xl overflow-hidden bg-white">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Department Badge */}
          <div className="absolute top-4 right-4">
            <span className="bg-white/90 text-orange-800 text-xs font-medium px-3 py-1 rounded-full">
              {getDepartmentName(member.department)}
            </span>
          </div>
          
          {/* Past Member Badge */}
          {member.status === 'past' && (
            <div className="absolute top-4 left-4">
              <span className="bg-black/90 text-white text-xs font-medium px-3 py-1 rounded-full">
                Former Member
              </span>
            </div>
          )}
        </div>
        
        {/* Name and Role Section */}
        <div className="pt-16 px-6 pb-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h2>
          <p className="text-orange-600 font-medium">{member.role}</p>
        </div>
        
        {/* Card Content */}
        <div className="p-6 flex-grow space-y-6">
          {/* Bio */}
          <div>
            <p className="text-gray-700 text-sm leading-relaxed">{member.bio}</p>
          </div>
          
          {/* Term Information */}
          <div className="bg-orange-50 rounded-lg p-3">
            <h3 className="font-semibold text-orange-800 text-sm mb-2 flex items-center">
              <Calendar className="w-4 h-4 text-orange-600 mr-2" />
              Term
            </h3>
            <p className="text-gray-700 text-sm">{member.term}</p>
          </div>
          
          {/* Career Path */}
          <div>
            <h3 className="font-semibold text-gray-900 text-sm mb-3 flex items-center">
              <History className="w-4 h-4 text-orange-600 mr-2" />
              Career Path
            </h3>
            <div className="space-y-3">
              {member.previousRoles.length > 0 ? (
                member.previousRoles.map((prevRole, i) => (
                  <div key={i} className="bg-gray-50 p-2 rounded-lg">
                    <div className="text-orange-700 font-medium text-sm">{prevRole.role}</div>
                    <div className="text-xs text-gray-500">{getDepartmentName(prevRole.department)} · {prevRole.term}</div>
                  </div>
                ))
              ) : (
                <div className="bg-gray-50 p-2 rounded-lg">
                  <div className="text-gray-500 text-sm">Current role is first position</div>
                </div>
              )}
            </div>
          </div>
          
          {/* Achievements */}
          <div>
            <h3 className="font-semibold text-gray-900 text-sm mb-3 flex items-center">
              <Award className="w-4 h-4 text-orange-600 mr-2" />
              Key Achievements
            </h3>
            <div className="space-y-2">
              {member.achievements.map((achievement, i) => (
                <div key={i} className="flex items-start">
                  <div className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-orange-600 mr-2"></div>
                  <p className="text-gray-700 text-sm">{achievement}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Card Footer */}
        <div className="bg-gray-50 p-4 border-t border-gray-100">
          <div className="flex justify-center items-center">
            <div className="flex space-x-6">
              <a
                href={`mailto:${member.contact.email}`}
                className="text-gray-500 hover:text-orange-600 transition-colors"
                title={member.contact.email}
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href={member.contact.linkedin}
                className="text-gray-500 hover:text-orange-600 transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={member.contact.twitter}
                className="text-gray-500 hover:text-orange-600 transition-colors"
                title="Twitter Profile"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MemberCard;
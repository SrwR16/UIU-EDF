import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Check } from 'lucide-react';
import { RegistrationData } from './membershipService';

interface RegistrationFormProps {
  onSubmit: (data: RegistrationData) => Promise<void>;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<RegistrationData>({
    firstName: '',
    lastName: '',
    email: '',
    studentId: '',
    major: '',
    trimester: '',
    studentPhoto: null,
    studentIdPhoto: null,
    acceptTerms: false
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files?.[0] || null : value
    }));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = "Email is invalid";
    if (!formData.studentId.trim()) errors.studentId = "Student ID is required";
    if (!formData.major.trim()) errors.major = "Major is required";
    if (!formData.trimester.trim()) errors.trimester = "Trimester is required";
    if (!formData.studentPhoto) errors.studentPhoto = "Student photo is required";
    if (!formData.studentIdPhoto) errors.studentIdPhoto = "Student ID photo is required";
    if (!formData.acceptTerms) errors.acceptTerms = "You must accept the terms and conditions";
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
        setIsSubmitted(true);
      } catch (error) {
        console.error('Error submitting form:', error);
        setFormErrors({ submit: 'Failed to submit form. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl shadow-xl p-8 mb-16 text-center"
      >
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-orange-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Registration Successful!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for registering! We'll review your information and get back to you soon.
        </p>
        <button className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-lg">
          Back to Homepage
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-2xl shadow-xl p-8 mb-16"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Register Now</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                formErrors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Your first name"
            />
            {formErrors.firstName && (
              <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                formErrors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Your last name"
            />
            {formErrors.lastName && (
              <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                formErrors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="your.email@university.edu"
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="studentId">
              Student ID Number
            </label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={formData.studentId}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                formErrors.studentId ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Your student ID number"
            />
            {formErrors.studentId && (
              <p className="text-red-500 text-sm mt-1">{formErrors.studentId}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="major">
              Major/Field of Study
            </label>
            <input
              type="text"
              id="major"
              name="major"
              value={formData.major}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                formErrors.major ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Your major or field of study"
            />
            {formErrors.major && (
              <p className="text-red-500 text-sm mt-1">{formErrors.major}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="trimester">
              Current Trimester/Semester
            </label>
            <input
              type="text"
              id="trimester"
              name="trimester"
              value={formData.trimester}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                formErrors.trimester ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Fall 2025, 3rd Trimester"
            />
            {formErrors.trimester && (
              <p className="text-red-500 text-sm mt-1">{formErrors.trimester}</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="studentPhoto">
              Your Photo
            </label>
            <div className={`border-2 border-dashed rounded-lg p-4 text-center ${
              formErrors.studentPhoto ? 'border-red-500' : 'border-gray-300'
            }`}>
              <input
                type="file"
                id="studentPhoto"
                name="studentPhoto"
                accept="image/*"
                onChange={handleInputChange}
                className="hidden"
              />
              <label
                htmlFor="studentPhoto"
                className="flex flex-col items-center cursor-pointer"
              >
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">
                  {formData.studentPhoto
                    ? formData.studentPhoto.name
                    : "Click to upload your photo"}
                </span>
              </label>
            </div>
            {formErrors.studentPhoto && (
              <p className="text-red-500 text-sm mt-1">{formErrors.studentPhoto}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="studentIdPhoto">
              Student ID Card Photo
            </label>
            <div className={`border-2 border-dashed rounded-lg p-4 text-center ${
              formErrors.studentIdPhoto ? 'border-red-500' : 'border-gray-300'
            }`}>
              <input
                type="file"
                id="studentIdPhoto"
                name="studentIdPhoto"
                accept="image/*"
                onChange={handleInputChange}
                className="hidden"
              />
              <label
                htmlFor="studentIdPhoto"
                className="flex flex-col items-center cursor-pointer"
              >
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">
                  {formData.studentIdPhoto
                    ? formData.studentIdPhoto.name
                    : "Click to upload ID card photo"}
                </span>
              </label>
            </div>
            {formErrors.studentIdPhoto && (
              <p className="text-red-500 text-sm mt-1">{formErrors.studentIdPhoto}</p>
            )}
          </div>
        </div>

        <div className={`flex items-start ${formErrors.acceptTerms ? 'mb-8' : 'mb-6'}`}>
          <div className="flex items-center h-5">
            <input
              id="acceptTerms"
              name="acceptTerms"
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={handleInputChange}
              className={`w-4 h-4 border rounded focus:ring-orange-500 ${
                formErrors.acceptTerms ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="acceptTerms" className="font-medium text-gray-700">
              I accept the <a href="#" className="text-orange-600 hover:underline">Terms and Conditions</a> and{' '}
              <a href="#" className="text-orange-600 hover:underline">Privacy Policy</a>
            </label>
            {formErrors.acceptTerms && (
              <p className="text-red-500 text-sm mt-1">{formErrors.acceptTerms}</p>
            )}
          </div>
        </div>

        {formErrors.submit && (
          <p className="text-red-500 text-sm text-center mb-4">{formErrors.submit}</p>
        )}
        
        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Submit Registration"}
        </button>
      </form>
    </motion.div>
  );
};

export default RegistrationForm;
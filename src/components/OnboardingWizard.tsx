import React, { useState } from 'react';
import { 
  User, 
  FileText, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft, 
  Upload,
  Briefcase,
  MapPin,
  Phone,
  Mail,
  Target,
  Sparkles
} from 'lucide-react';

interface OnboardingWizardProps {
  onComplete: (profileData: ProfileData) => void;
  onSkip: () => void;
}

interface ProfileData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    bio: string;
    jobTitle: string;
    experience: string;
  };
  preferences: {
    jobTypes: string[];
    salaryRange: string;
    workLocation: string;
  };
  resumeUploaded: boolean;
}

const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState<ProfileData>({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      bio: '',
      jobTitle: '',
      experience: ''
    },
    preferences: {
      jobTypes: [],
      salaryRange: '',
      workLocation: ''
    },
    resumeUploaded: false
  });

  const totalSteps = 4;

  const updatePersonalInfo = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updatePreferences = (field: string, value: string | string[]) => {
    setProfileData(prev => ({
      ...prev,
      preferences: { ...prev.preferences, [field]: value }
    }));
  };

  const toggleJobType = (jobType: string) => {
    setProfileData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        jobTypes: prev.preferences.jobTypes.includes(jobType)
          ? prev.preferences.jobTypes.filter(type => type !== jobType)
          : [...prev.preferences.jobTypes, jobType]
      }
    }));
  };

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to a server
      setProfileData(prev => ({ ...prev, resumeUploaded: true }));
    }
  };

  const isStep1Valid = profileData.personalInfo.name && profileData.personalInfo.email && profileData.personalInfo.location;
  const isStep2Valid = profileData.personalInfo.jobTitle && profileData.personalInfo.experience;
  const isStep3Valid = profileData.preferences.jobTypes.length > 0 && profileData.preferences.workLocation;

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome! Let's get started</h2>
        <p className="text-gray-600">Tell us about yourself to personalize your experience</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Mail className="w-4 h-4 inline mr-1" />
            Full Name *
          </label>
          <input
            type="text"
            value={profileData.personalInfo.name}
            onChange={(e) => updatePersonalInfo('name', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Mail className="w-4 h-4 inline mr-1" />
            Email Address *
          </label>
          <input
            type="email"
            value={profileData.personalInfo.email}
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Phone className="w-4 h-4 inline mr-1" />
            Phone Number
          </label>
          <input
            type="tel"
            value={profileData.personalInfo.phone}
            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            Location *
          </label>
          <input
            type="text"
            value={profileData.personalInfo.location}
            onChange={(e) => updatePersonalInfo('location', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="San Francisco, CA"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          About You
        </label>
        <textarea
          rows={3}
          value={profileData.personalInfo.bio}
          onChange={(e) => updatePersonalInfo('bio', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Tell us about your background, interests, and what you're passionate about..."
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Briefcase className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Professional Background</h2>
        <p className="text-gray-600">Help us understand your career journey</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Target className="w-4 h-4 inline mr-1" />
          Current/Desired Job Title *
        </label>
        <input
          type="text"
          value={profileData.personalInfo.jobTitle}
          onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          placeholder="e.g., Senior Frontend Developer"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Experience Level *
        </label>
        <select
          value={profileData.personalInfo.experience}
          onChange={(e) => updatePersonalInfo('experience', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        >
          <option value="">Select your experience level</option>
          <option value="entry">Entry Level (0-2 years)</option>
          <option value="mid">Mid Level (3-5 years)</option>
          <option value="senior">Senior Level (6-10 years)</option>
          <option value="lead">Lead/Principal (10+ years)</option>
          <option value="executive">Executive Level</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Professional Summary
        </label>
        <textarea
          rows={4}
          value={profileData.personalInfo.bio}
          onChange={(e) => updatePersonalInfo('bio', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          placeholder="Describe your professional background, key achievements, and career goals..."
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Target className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Job Preferences</h2>
        <p className="text-gray-600">Let us know what you're looking for</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Job Types You're Interested In *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship', 'Remote'].map((type) => (
            <button
              key={type}
              onClick={() => toggleJobType(type)}
              className={`p-3 border rounded-lg text-sm font-medium transition-all ${
                profileData.preferences.jobTypes.includes(type)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Work Location *
        </label>
        <select
          value={profileData.preferences.workLocation}
          onChange={(e) => updatePreferences('workLocation', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          <option value="">Select work preference</option>
          <option value="remote">Remote Only</option>
          <option value="hybrid">Hybrid</option>
          <option value="onsite">On-site Only</option>
          <option value="flexible">Flexible</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Expected Salary Range
        </label>
        <select
          value={profileData.preferences.salaryRange}
          onChange={(e) => updatePreferences('salaryRange', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          <option value="">Select salary range</option>
          <option value="30k-50k">$30k - $50k</option>
          <option value="50k-80k">$50k - $80k</option>
          <option value="80k-120k">$80k - $120k</option>
          <option value="120k-160k">$120k - $160k</option>
          <option value="160k+">$160k+</option>
        </select>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload Your Resume</h2>
        <p className="text-gray-600">Add your resume to get better job matches</p>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
        <input
          type="file"
          id="resume-upload"
          accept=".pdf,.doc,.docx"
          onChange={handleResumeUpload}
          className="hidden"
        />
        <label htmlFor="resume-upload" className="cursor-pointer">
          <div className="mb-4">
            {profileData.resumeUploaded ? (
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
            ) : (
              <Upload className="w-12 h-12 text-gray-400 mx-auto" />
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {profileData.resumeUploaded ? 'Resume Uploaded Successfully!' : 'Upload Your Resume'}
          </h3>
          <p className="text-gray-600 mb-4">
            {profileData.resumeUploaded 
              ? 'Your resume has been uploaded and is ready to use'
              : 'Drag and drop your resume here, or click to browse'
            }
          </p>
          {!profileData.resumeUploaded && (
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Upload className="w-5 h-5" />
              <span>Choose File</span>
            </div>
          )}
        </label>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Sparkles className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-blue-800 mb-1">Pro Tip</h4>
            <p className="text-sm text-blue-700">
              You can also use our AI Resume Builder to create a professional resume from scratch. 
              This will be available in your dashboard after onboarding.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => setProfileData(prev => ({ ...prev, resumeUploaded: false }))}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Skip for now - I'll upload later
        </button>
      </div>
    </div>
  );

  const renderComplete = () => (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-white" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">You're All Set!</h2>
      <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
        Your profile is complete and you're ready to start exploring amazing job opportunities.
      </p>
      
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
        <h3 className="font-semibold text-gray-800 mb-4">What's Next?</h3>
        <div className="space-y-3 text-left max-w-md mx-auto">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span className="text-sm text-gray-700">Browse personalized job recommendations</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span className="text-sm text-gray-700">Use AI tools to enhance your resume</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span className="text-sm text-gray-700">Get career guidance from our AI assistant</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span className="text-sm text-gray-700">Apply to jobs with one click</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => onComplete(profileData)}
        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2 mx-auto"
      >
        <span>Start Job Hunting</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return isStep1Valid;
      case 2: return isStep2Valid;
      case 3: return isStep3Valid;
      case 4: return true;
      default: return false;
    }
  };

  if (currentStep > totalSteps) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8">
            {renderComplete()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">Step {currentStep} of {totalSteps}</span>
            <button
              onClick={onSkip}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Skip onboarding
            </button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-6 lg:p-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center space-x-2 px-4 py-2 lg:px-6 lg:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            <div className="flex space-x-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i + 1 <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {currentStep === totalSteps ? (
              <button
                onClick={() => setCurrentStep(totalSteps + 1)}
                className="flex items-center space-x-2 px-4 py-2 lg:px-6 lg:py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all"
              >
                <span>Complete Setup</span>
                <CheckCircle className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className="flex items-center space-x-2 px-4 py-2 lg:px-6 lg:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                <span>Next</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;
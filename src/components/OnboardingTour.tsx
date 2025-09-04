import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, Target, Sparkles } from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  targetSelector: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  action?: string;
}

interface OnboardingTourProps {
  isVisible: boolean;
  onClose: () => void;
  onComplete: () => void;
  currentView: string;
  onNavigate: (view: string) => void;
}

const OnboardingTour: React.FC<OnboardingTourProps> = ({ 
  isVisible, 
  onClose, 
  onComplete, 
  currentView,
  onNavigate 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightedElement, setHighlightedElement] = useState<HTMLElement | null>(null);

  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to TalentConnect! 🎉',
      description: 'Let\'s take a quick tour to show you how to make the most of our platform. This will only take a minute!',
      targetSelector: '.hero-section',
      position: 'bottom'
    },
    {
      id: 'find-job-button',
      title: 'Find Your Dream Job',
      description: 'Click here to access our job search dashboard where you can browse thousands of opportunities.',
      targetSelector: '.find-job-btn',
      position: 'top',
      action: 'job-seeker'
    },
    {
      id: 'post-job-button',
      title: 'Hire Top Talent',
      description: 'Employers can post jobs and find qualified candidates using our advanced matching system.',
      targetSelector: '.post-job-btn',
      position: 'top',
      action: 'employer'
    }
  ];

  const jobSeekerSteps: OnboardingStep[] = [
    {
      id: 'job-search',
      title: 'Browse Jobs',
      description: 'Search and filter through thousands of job opportunities tailored to your skills.',
      targetSelector: '.jobs-tab',
      position: 'right'
    },
    {
      id: 'ai-resume',
      title: 'AI Resume Builder',
      description: 'Use our AI-powered resume builder to create a professional resume in minutes.',
      targetSelector: '.resume-tab',
      position: 'right'
    },
    {
      id: 'ai-assistant',
      title: 'AI Career Assistant',
      description: 'Get personalized career advice and job search tips from our AI assistant.',
      targetSelector: '.chatbot-tab',
      position: 'right'
    },
    {
      id: 'resume-rating',
      title: 'Resume Rating Tool',
      description: 'Test how well your resume matches specific job requirements with our AI analyzer.',
      targetSelector: '.resume-rating-btn',
      position: 'bottom'
    }
  ];

  const employerSteps: OnboardingStep[] = [
    {
      id: 'post-job',
      title: 'Post a Job',
      description: 'Create compelling job postings with our AI-powered description generator.',
      targetSelector: '.post-job-tab',
      position: 'bottom'
    },
    {
      id: 'manage-jobs',
      title: 'Manage Your Listings',
      description: 'Track applications, view analytics, and manage all your job postings in one place.',
      targetSelector: '.manage-jobs-tab',
      position: 'bottom'
    },
    {
      id: 'ai-generate',
      title: 'AI Job Description',
      description: 'Let AI create professional job descriptions based on your requirements.',
      targetSelector: '.ai-generate-btn',
      position: 'left'
    }
  ];

  const getCurrentSteps = () => {
    if (currentView === 'job-seeker') return [...steps.slice(0, 1), ...jobSeekerSteps];
    if (currentView === 'employer') return [...steps.slice(0, 1), ...employerSteps];
    return steps;
  };

  const currentSteps = getCurrentSteps();
  const currentStepData = currentSteps[currentStep];

  useEffect(() => {
    if (!isVisible || !currentStepData) return;

    const element = document.querySelector(currentStepData.targetSelector) as HTMLElement;
    if (element) {
      setHighlightedElement(element);
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentStep, isVisible, currentStepData, currentView]);

  const nextStep = () => {
    if (currentStepData?.action && currentView === 'landing') {
      // Navigate to the specified view
      onNavigate(currentStepData.action);
      // Reset step counter for the new view
      setTimeout(() => setCurrentStep(1), 100);
    } else if (currentStep < currentSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipTour = () => {
    onClose();
  };

  const getTooltipPosition = () => {
    if (!highlightedElement || !currentStepData) return {};

    const rect = highlightedElement.getBoundingClientRect();
    const tooltipWidth = 320;
    const tooltipHeight = 200;
    const offset = 20;

    switch (currentStepData.position) {
      case 'top':
        return {
          top: rect.top - tooltipHeight - offset,
          left: rect.left + (rect.width / 2) - (tooltipWidth / 2),
        };
      case 'bottom':
        return {
          top: rect.bottom + offset,
          left: rect.left + (rect.width / 2) - (tooltipWidth / 2),
        };
      case 'left':
        return {
          top: rect.top + (rect.height / 2) - (tooltipHeight / 2),
          left: rect.left - tooltipWidth - offset,
        };
      case 'right':
        return {
          top: rect.top + (rect.height / 2) - (tooltipHeight / 2),
          left: rect.right + offset,
        };
      default:
        return {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        };
    }
  };

  if (!isVisible || !currentStepData) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
        {/* Highlight */}
        {highlightedElement && (
          <div
            className="absolute border-4 border-blue-500 rounded-lg pointer-events-none transition-all duration-300"
            style={{
              top: highlightedElement.getBoundingClientRect().top - 4,
              left: highlightedElement.getBoundingClientRect().left - 4,
              width: highlightedElement.getBoundingClientRect().width + 8,
              height: highlightedElement.getBoundingClientRect().height + 8,
              boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
            }}
          />
        )}

        {/* Tooltip */}
        <div
          className="absolute bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 z-60 max-w-sm"
          style={getTooltipPosition()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="pr-8">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-blue-600">
                Step {currentStep + 1} of {currentSteps.length}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {currentStepData.title}
            </h3>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              {currentStepData.description}
            </p>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={skipTour}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Skip tour
              </button>

              <div className="flex items-center space-x-3">
                {currentStep > 0 && (
                  <button
                    onClick={prevStep}
                    className="flex items-center space-x-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                )}
                
                <button
                  onClick={nextStep}
                  className="flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-sm font-medium"
                >
                  <span>{currentStep === currentSteps.length - 1 ? 'Finish' : 'Next'}</span>
                  {currentStep === currentSteps.length - 1 ? (
                    <Sparkles className="w-4 h-4" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center space-x-2 mt-4 pt-4 border-t border-gray-200">
            {currentSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardingTour;
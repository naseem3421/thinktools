"use client";

import React, { useState } from "react";
import { X, Mail, CheckCircle2, ArrowRight } from "lucide-react";

interface ProjectDiscussionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTopic?: string;
}

export default function ProjectDiscussionModal({
  isOpen,
  onClose,
  defaultTopic = "Custom Calculator Development",
}: ProjectDiscussionModalProps) {
  const [topic, setTopic] = useState<string>(defaultTopic);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [intendedUsers, setIntendedUsers] = useState<string>("");
  const [problemToSolve, setProblemToSolve] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const mailtoSubject = encodeURIComponent(
    `Custom Solution Enquiry: ${topic || "Project Discussion"}`
  );
  const mailtoBody = encodeURIComponent(
    `Name: ${name || "[Your Name]"}\nEmail: ${email || "[Your Email]"}\n\nProject / Solution Needed: ${topic}\n\nProblem to Solve:\n${problemToSolve || "[Describe the problem]"}\n\nIntended Users:\n${intendedUsers || "[Who will use it]"}\n\nRequirement Details:\n${description || "[Additional details]"}`
  );
  const mailtoLink = `mailto:support@thinktools.in?subject=${mailtoSubject}&body=${mailtoBody}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#172033]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#172033] text-white p-5 sm:p-6 flex items-start justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#B9F36B] text-[#172033] font-bold inline-block mb-1">
              Custom Solution Enquiry
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Discuss Your Requirement
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Tell us what you need to build, who will use it, and what problem it should solve.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-7">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                Enquiry Drafted Successfully
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you! You can now send this project brief directly to{" "}
                <strong className="text-slate-900">support@thinktools.in</strong>. We assess every project individually and respond with feasibility, estimated scope, and timeline.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={mailtoLink}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#172033] hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all"
                >
                  <Mail className="w-4 h-4 text-[#B9F36B]" />
                  <span>Open in Email App</span>
                </a>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Requirement Category
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#172033]/20"
                >
                  <option value="Custom Calculators">Custom Calculators</option>
                  <option value="Business Software & SaaS">Business Software & SaaS</option>
                  <option value="Workflow Automation">Workflow Automation</option>
                  <option value="Digital Product Development">Digital Product Development</option>
                  <option value="Construction Management SaaS Interest">Construction Management SaaS (Register Interest)</option>
                  <option value="WhatsApp Automation Product Interest">WhatsApp Automation Product (Register Interest)</option>
                  <option value="Other Project Requirement">Other Project Requirement</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#172033]/20"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#172033]/20"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  What problem should this tool or software solve?
                </label>
                <input
                  type="text"
                  placeholder="e.g. Calculate concrete quantities for residential site estimates and generate client quotes"
                  value={problemToSolve}
                  onChange={(e) => setProblemToSolve(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#172033]/20"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Who will use it? (Intended Users)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Internal site supervisors, estimators, and contractors"
                  value={intendedUsers}
                  onChange={(e) => setIntendedUsers(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#172033]/20"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Additional Scope / Key Details
                </label>
                <textarea
                  rows={3}
                  placeholder="Formulas, inputs, outputs, specific integrations, or existing spreadsheets you want converted..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#172033]/20"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-100">
                <a
                  href={mailtoLink}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-600" />
                  <span>Email Directly</span>
                </a>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#172033] hover:bg-slate-800 text-white font-bold transition-all shadow-xs cursor-pointer"
                >
                  <span>Submit Brief</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#B9F36B]" />
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer Note */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500">
          Projects are assessed individually. Scope, cost, timeline, and dependencies are agreed upon before development begins.
        </div>
      </div>
    </div>
  );
}

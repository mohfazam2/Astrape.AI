"use client";

import { Github, Linkedin, Server, FileText, ExternalLink } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-black text-white py-12 mt-16">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Brand Section */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4">SwiftCart</h3>
                        <p className="text-gray-300 mb-4">
                            A modern e-commerce platform built with Next.js and TypeScript For Astrape.AI
                            Web Development internship.
                        </p>
                        <p className="text-gray-400 text-sm">
                            to showcase full-stack development skills.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <div className="space-y-2">
                            <div className="text-gray-300 hover:text-white cursor-pointer transition-colors">
                                Home
                            </div>
                            <div className="text-gray-300 hover:text-white cursor-pointer transition-colors">
                                Browse Categories
                            </div>
                            <div className="text-gray-300 hover:text-white cursor-pointer transition-colors">
                                Products
                            </div>
                            <div className="text-gray-300 hover:text-white cursor-pointer transition-colors">
                                Add Product
                            </div>
                        </div>
                    </div>

                    {/* Connect Section */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Connect With Me</h4>
                        <div className="space-y-3">

                            <a
                                href="https://github.com/Mohfazam2"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                            >
                                <Github size={20} />
                                <span className="group-hover:underline">GitHub Profile (Secondary Account for the assignment code)</span>
                                <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>

                            <a
                                href="https://github.com/Mohfazam"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                            >
                                <Github size={20} />
                                <span className="group-hover:underline">GitHub Profile (Primary Account is currently Flagged for some unknown reason)</span>
                                <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>

                            <a
                                href="https://github.com/mohfazam2/Astrape.AI"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                            >
                                <Server size={20} />
                                <span className="group-hover:underline">Repo Link</span>
                                <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>

                            <a
                                href="http://www.linkedin.com/in/mohammed-sarwar-khan"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                            >
                                <Linkedin size={20} />
                                <span className="group-hover:underline">LinkedIn Profile</span>
                                <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>

                            <a
                                href="/Sarwar-Resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                            >
                                <FileText size={20} />
                                <span className="group-hover:underline">View Resume</span>
                                <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </div>

                        <div className="mt-6 p-4 bg-gray-900 rounded-lg">
                            <p className="text-sm text-gray-300 mb-2">📧 Get in touch:</p>
                            <p className="text-white text-sm">mohd.sarwar.code@gmail.com</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} SwiftCart. Built with ❤️ for internship application.
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                        Showcasing React, Next.js, TypeScript, and modern web development practices.
                    </p>
                </div>
            </div>
        </footer>
    );
};
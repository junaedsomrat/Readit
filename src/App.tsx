/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus, 
  Minus, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Copy, 
  Check, 
  ArrowRight, 
  Shield, 
  HelpCircle, 
  ExternalLink,
  Heart,
  Github,
  Twitter,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const encrypt = (text: string) => {
  try {
    return btoa(encodeURIComponent(text));
  } catch (e) {
    return "";
  }
};

const decrypt = (encoded: string) => {
  try {
    return decodeURIComponent(atob(encoded));
  } catch (e) {
    return null;
  }
};

// --- Components ---

const Navbar = ({ setPage }: { setPage: (p: string) => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-bottom border-white/5">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div 
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => {
          window.history.pushState({}, '', window.location.pathname);
          setPage('home');
        }}
      >
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
          <span className="text-black font-bold text-xl">R</span>
        </div>
        <span className="text-2xl font-bold tracking-tight font-google-sans">Readit</span>
      </div>
      <div className="flex items-center gap-8 text-sm font-medium text-white/60">
        <button onClick={() => setPage('home')} className="hover:text-white transition-colors cursor-pointer">Home</button>
        <button onClick={() => setPage('faq')} className="hover:text-white transition-colors cursor-pointer">FAQ</button>
        <button onClick={() => setPage('disclaimer')} className="hover:text-white transition-colors cursor-pointer">Disclaimer</button>
        <a 
          href="https://github.com/junaedsomrat" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all flex items-center gap-2"
        >
          <Github size={16} />
          <span>GitHub</span>
        </a>
      </div>
    </div>
  </nav>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                <span className="text-black font-bold text-sm">R</span>
              </div>
              <span className="text-xl font-bold tracking-tight font-google-sans">Readit</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              A professional suite of tools for text-to-link sharing and placeholder image generation. Built for privacy and speed.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#create-text" className="hover:text-white transition-colors">Create Text</a></li>
              <li><a href="#image-gen" className="hover:text-white transition-colors">Image Generator</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Github size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Globe size={18} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center pt-10 border-t border-white/5">
          <div className="flex items-center gap-1 text-lg font-medium mb-2 font-google-sans">
            <span>Developed by</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-500 mx-1">
              <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="currentColor"/>
            </svg>
            <span className="text-white">Junaed Somrat</span>
          </div>
          <p className="text-white/30 text-xs tracking-wider">
            © 2025 - {currentYear}, Junaed Somrat all rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string, key?: React.Key }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-white/5 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-medium text-white/80 group-hover:text-white transition-colors">{question}</span>
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center transition-all",
          isOpen ? "bg-white text-black rotate-180" : "bg-white/5 text-white"
        )}>
          {isOpen ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          )}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-white/40 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Page Views ---

const HomeView = () => {
  const [textInput, setTextInput] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copied, setCopied] = useState(false);
  
  const [imgText, setImgText] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const handleGetUrl = () => {
    if (!textInput.trim()) return;
    const encrypted = encrypt(textInput);
    const url = `${window.location.origin}${window.location.pathname}?data=${encrypted}`;
    setGeneratedUrl(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateImage = () => {
    if (!imgText.trim()) return;
    // Using a placeholder service that takes a seed
    const url = `https://picsum.photos/seed/${encodeURIComponent(imgText)}/800/600`;
    setImgUrl(url);
  };

  return (
    <div className="pt-32 pb-20">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 mb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 text-white/60">
            Professional Web Tools
          </span>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 font-google-sans">
            Share text <br />
            <span className="text-white/40">without boundaries.</span>
          </h1>
          <p className="text-xl text-white/40 max-w-2xl mx-auto mb-12 leading-relaxed">
            Readit allows you to encrypt text into shareable URLs and generate unique placeholder images instantly. No database, no tracking, just pure utility.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#create-text" className="adobe-button flex items-center gap-2">
              <span>Create Text Link</span>
              <ArrowRight size={18} />
            </a>
            <a href="#image-gen" className="px-6 py-3 border border-white/10 rounded-full hover:bg-white/5 transition-all font-semibold">
              Generate Images
            </a>
          </div>
        </motion.div>
      </section>

      {/* Feature 1: Create Text */}
      <section id="create-text" className="max-w-4xl mx-auto px-6 mb-40">
        <div className="glass-card p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white">
              <LinkIcon size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-google-sans">CREATE TEXT</h2>
              <p className="text-white/40 text-sm">Generate a secure link for your text</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Your Message</label>
              <textarea 
                className="adobe-input min-h-[150px] resize-none"
                placeholder="Type your message here..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
              />
            </div>
            
            <button 
              onClick={handleGetUrl}
              className="adobe-button w-full flex items-center justify-center gap-2"
            >
              <span>Get URL</span>
              <ExternalLink size={18} />
            </button>

            <AnimatePresence>
              {generatedUrl && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-6 border-t border-white/5"
                >
                  <label className="block text-sm font-medium text-white/60 mb-2">Shareable Link</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      readOnly 
                      value={generatedUrl}
                      className="adobe-input flex-1 font-mono text-xs"
                    />
                    <button 
                      onClick={copyToClipboard}
                      className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                    >
                      {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                    </button>
                  </div>
                  <p className="mt-4 text-xs text-white/30 italic">
                    This link contains your encrypted text. No data is stored on our servers.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Feature 2: Image Generator */}
      <section id="image-gen" className="max-w-4xl mx-auto px-6 mb-40">
        <div className="glass-card p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white">
              <ImageIcon size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-google-sans">IMAGE GENERATOR</h2>
              <p className="text-white/40 text-sm">Create unique placeholder images from text</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Seed Text</label>
                <input 
                  type="text"
                  className="adobe-input"
                  placeholder="e.g. abstract blue waves"
                  value={imgText}
                  onChange={(e) => setImgText(e.target.value)}
                />
              </div>
              <button 
                onClick={generateImage}
                className="adobe-button w-full flex items-center justify-center gap-2"
              >
                <span>Generate Image</span>
                <ImageIcon size={18} />
              </button>
              <p className="text-xs text-white/30">
                Each unique text generates a unique image. Perfect for mockups and placeholders.
              </p>
            </div>
            
            <div className="aspect-video bg-white/5 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center relative">
              {imgUrl ? (
                <img 
                  src={imgUrl} 
                  alt="Generated" 
                  className="w-full h-full object-cover fade-in"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="text-center p-6">
                  <ImageIcon size={48} className="mx-auto mb-4 text-white/10" />
                  <p className="text-white/20 text-sm">Your image will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const DecryptedView = ({ text }: { text: string }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full glass-card p-12 text-center fade-in"
      >
        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <Shield size={32} className="text-white" />
        </div>
        <h2 className="text-sm font-semibold tracking-widest uppercase text-white/40 mb-6">Decrypted Message</h2>
        <div className="text-3xl md:text-5xl font-bold font-google-sans leading-tight text-white mb-12 whitespace-pre-wrap">
          {text}
        </div>
        <div className="pt-8 border-t border-white/5">
          <p className="text-white/30 text-sm mb-8">
            This message was securely decrypted from the URL.
          </p>
          <button 
            onClick={() => window.location.href = window.location.origin + window.location.pathname}
            className="adobe-button"
          >
            Create Your Own Link
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const FAQPage = () => {
  const faqs = [
    {
      question: "How does the text encryption work?",
      answer: "We use a client-side Base64 encoding combined with URI component handling. This means your text is converted into a format that can safely live within a URL. When someone opens the link, our site's JavaScript reverses the process to show the original text. No data ever touches our servers."
    },
    {
      question: "Is my data stored on your server?",
      answer: "Absolutely not. Readit is a static tool. We don't have a database for your messages. The entire content of your message is stored within the URL you share. If you lose the link, the message is gone forever."
    },
    {
      question: "How are the placeholder images generated?",
      answer: "We use a seed-based image generation system. Your input text acts as a unique 'seed' for an algorithm that selects a specific image from a vast library. The same text will always generate the same image, making it perfect for consistent placeholders."
    },
    {
      question: "Can anyone read my encrypted links?",
      answer: "Anyone who has the link can view the message, as the decryption logic is public on our site. This tool is designed for easy sharing, not for high-security military-grade secrets. Think of it as a professional way to share formatted text or notes."
    },
    {
      question: "Is Readit free to use?",
      answer: "Yes, Readit is completely free and open for everyone. It was developed by Junaed Somrat as a utility tool for the community."
    }
  ];

  return (
    <div className="pt-40 pb-20 max-w-3xl mx-auto px-6">
      <div className="text-center mb-20">
        <HelpCircle size={48} className="mx-auto mb-6 text-white/20" />
        <h1 className="text-5xl font-bold font-google-sans mb-4">Frequently Asked Questions</h1>
        <p className="text-white/40">Everything you need to know about Readit.</p>
      </div>
      <div className="glass-card p-8">
        {faqs.map((faq, i) => (
          <FAQItem key={i} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

const DisclaimerPage = () => {
  return (
    <div className="pt-40 pb-20 max-w-3xl mx-auto px-6">
      <div className="text-center mb-20">
        <Shield size={48} className="mx-auto mb-6 text-white/20" />
        <h1 className="text-5xl font-bold font-google-sans mb-4">Disclaimer</h1>
        <p className="text-white/40">Legal information and usage terms.</p>
      </div>
      <div className="glass-card p-12 prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-6 font-google-sans">Usage Terms</h2>
        <p className="text-white/60 mb-8 leading-relaxed">
          The Readit tool is provided "as is" without any warranties of any kind. By using this tool, you acknowledge that you are solely responsible for the content you share through generated links.
        </p>
        
        <h2 className="text-2xl font-bold mb-6 font-google-sans">Privacy & Data</h2>
        <p className="text-white/60 mb-8 leading-relaxed">
          Readit does not store, collect, or monitor any text entered into the "Create Text" section. All encryption and decryption happen locally in your browser. However, because the text is stored in the URL, anyone with access to your browser history or the link itself can view the content.
        </p>

        <h2 className="text-2xl font-bold mb-6 font-google-sans">External Services</h2>
        <p className="text-white/60 mb-8 leading-relaxed">
          The placeholder image generator uses external APIs (like Picsum Photos). We are not responsible for the content of the images generated by these third-party services.
        </p>

        <h2 className="text-2xl font-bold mb-6 font-google-sans">Liability</h2>
        <p className="text-white/60 leading-relaxed">
          Junaed Somrat and the Readit contributors shall not be held liable for any misuse of the tool, data leaks resulting from shared links, or any damages arising from the use of this website.
        </p>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [page, setPage] = useState('home');
  const [decryptedText, setDecryptedText] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = params.get('data');
    if (data) {
      const text = decrypt(data);
      if (text) {
        setDecryptedText(text);
        setPage('decrypted');
      }
    }
  }, []);

  // Handle back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const data = params.get('data');
      if (data) {
        const text = decrypt(data);
        if (text) {
          setDecryptedText(text);
          setPage('decrypted');
        }
      } else {
        setPage('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar setPage={setPage} />
      
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {page === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <HomeView />
            </motion.div>
          )}
          {page === 'decrypted' && decryptedText && (
            <motion.div key="decrypted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DecryptedView text={decryptedText} />
            </motion.div>
          )}
          {page === 'faq' && (
            <motion.div key="faq" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <FAQPage />
            </motion.div>
          )}
          {page === 'disclaimer' && (
            <motion.div key="disclaimer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DisclaimerPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/_authentication")({
  beforeLoad: ({ context: { user } }) => {
    if (user) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <React.Fragment>
      <div className="min-h-screen flex">
        <div className="w-full lg:w-1/3 xl:w-1/4 flex bg-white">
          <Outlet />
        </div>

        <div className="hidden lg:flex lg:w-2/3 xl:w-3/4 relative bg-gray-900 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 animate-gradient-shift" />

          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-float-slow opacity-60" />
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-float-medium opacity-40" />
            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-300 rounded-full animate-float-fast opacity-50" />
            <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-indigo-300 rounded-full animate-float-slow opacity-30" />
            <div className="absolute bottom-1/3 right-1/2 w-2 h-2 bg-purple-400 rounded-full animate-float-medium opacity-40" />
          </div>
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-transparent to-purple-900/20 animate-pulse-slow" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12">
              <div className="text-center space-y-6 max-w-2xl">
                <h1 className="text-5xl font-bold mb-4 animate-fade-in-up">
                  Voxx Car Systems
                </h1>
                <p className="text-xl text-blue-100 leading-relaxed animate-fade-in-up-delay">
                  Gelişmiş araç yönetim sistemi ile filonuzu kontrol altında
                  tutun. Gerçek zamanlı takip, akıllı analiz ve güvenli yönetim.
                </p>
                <div className="flex items-center justify-center space-x-8 mt-8">
                  <div className="text-center animate-fade-in-up-delay-1 hover:scale-110 transition-transform duration-300">
                    <div className="text-3xl font-bold text-blue-300 animate-pulse-number">
                      24/7
                    </div>
                    <div className="text-sm text-blue-200">Monitoring</div>
                  </div>
                  <div className="text-center animate-fade-in-up-delay-2 hover:scale-110 transition-transform duration-300">
                    <div className="text-3xl font-bold text-blue-300 animate-pulse-number">
                      99.9%
                    </div>
                    <div className="text-sm text-blue-200">Uptime</div>
                  </div>
                  <div className="text-center animate-fade-in-up-delay-3 hover:scale-110 transition-transform duration-300">
                    <div className="text-3xl font-bold text-blue-300 animate-pulse-number">
                      1000+
                    </div>
                    <div className="text-sm text-blue-200">Vehicles</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes gradient-shift {
            0%,
            100% {
              background: linear-gradient(135deg, #1e3a8a, #312e81, #581c87);
            }
            50% {
              background: linear-gradient(135deg, #1e40af, #3730a3, #6b21a8);
            }
          }

          @keyframes float-slow {
            0%,
            100% {
              transform: translateY(0px) translateX(0px);
            }
            33% {
              transform: translateY(-20px) translateX(10px);
            }
            66% {
              transform: translateY(10px) translateX(-5px);
            }
          }

          @keyframes float-medium {
            0%,
            100% {
              transform: translateY(0px) translateX(0px);
            }
            50% {
              transform: translateY(-15px) translateX(15px);
            }
          }

          @keyframes float-fast {
            0%,
            100% {
              transform: translateY(0px) translateX(0px);
            }
            25% {
              transform: translateY(-10px) translateX(5px);
            }
            75% {
              transform: translateY(5px) translateX(-10px);
            }
          }

          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes pulse-slow {
            0%,
            100% {
              opacity: 0.3;
            }
            50% {
              opacity: 0.1;
            }
          }

          @keyframes pulse-number {
            0%,
            100% {
              opacity: 1;
            }
            50% {
              opacity: 0.8;
            }
          }

          .animate-gradient-shift {
            animation: gradient-shift 8s ease-in-out infinite;
          }

          .animate-float-slow {
            animation: float-slow 6s ease-in-out infinite;
          }

          .animate-float-medium {
            animation: float-medium 4s ease-in-out infinite;
          }

          .animate-float-fast {
            animation: float-fast 3s ease-in-out infinite;
          }

          .animate-fade-in-up {
            animation: fade-in-up 1s ease-out;
          }

          .animate-fade-in-up-delay {
            animation: fade-in-up 1s ease-out 0.3s both;
          }

          .animate-fade-in-up-delay-1 {
            animation: fade-in-up 1s ease-out 0.6s both;
          }

          .animate-fade-in-up-delay-2 {
            animation: fade-in-up 1s ease-out 0.8s both;
          }

          .animate-fade-in-up-delay-3 {
            animation: fade-in-up 1s ease-out 1s both;
          }

          .animate-pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
          }

          .animate-pulse-number {
            animation: pulse-number 3s ease-in-out infinite;
          }
        `}</style>
      </div>
    </React.Fragment>
  );
}

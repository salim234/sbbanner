import React, { useState, useRef, useCallback } from 'react';
import { AppData } from './types';
import { INITIAL_DATA } from './constants';
import BannerPreview from './components/BannerPreview';
import BannerForm from './components/BannerForm';

// This is a workaround for using the CDN-loaded library in TypeScript
declare global {
    interface Window {
        htmlToImage: any;
    }
}

function App() {
    const [data, setData] = useState<AppData>(INITIAL_DATA);
    const bannerRef = useRef<HTMLDivElement>(null);

    const handleExport = useCallback(() => {
        if (bannerRef.current === null || !window.htmlToImage) {
            alert('Could not export image. Preview element not found or library not loaded.');
            return;
        }
        window.htmlToImage.toPng(bannerRef.current, { 
            cacheBust: true, 
            pixelRatio: 2,
            backgroundColor: '#ffffff'
         })
            .then((dataUrl: string) => {
                const link = document.createElement('a');
                link.download = `apbdes-${data.header.villageName.toLowerCase()}-${data.header.year}.png`;
                link.href = dataUrl;
                link.click();
            })
            .catch((err: Error) => {
                console.error('Oops, something went wrong!', err);
                alert(`Failed to export image: ${err.message}`);
            });
    }, [data.header.villageName, data.header.year]);

    return (
        <div className="min-h-screen font-sans text-slate-800">
            <header className="bg-white text-slate-800 p-4 shadow-md sticky top-0 z-10">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Salam Berdesa APBDes Banner Generator</h1>
                    <button
                        onClick={handleExport}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg transition-colors"
                    >
                        Export as PNG
                    </button>
                </div>
            </header>

            <main className="container mx-auto p-4 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Form Panel: Sticky and scrolls internally */}
                    <div className="lg:col-span-3 xl:col-span-4 lg:sticky lg:top-24">
                       <div className="bg-white p-6 rounded-xl shadow-lg max-h-[calc(100vh-7rem)] overflow-y-auto">
                         <h2 className="text-xl font-bold mb-4 border-b pb-3 text-slate-700">Edit Banner Data</h2>
                         <BannerForm data={data} setData={setData} />
                       </div>
                    </div>
                    {/* Banner Preview: Scrolls with the page */}
                    <div className="lg:col-span-9 xl:col-span-8">
                        <div className="bg-white p-4 rounded-xl shadow-lg">
                           <BannerPreview ref={bannerRef} data={data} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
import React from 'react';
import Navbar from '../../components/frontend/Navbar';
export default function FrontLayout({children}){
    return(
        <>
            <header>
                <Navbar/>
            </header>
            <main>
                <div className="container">
                    {children}
                </div>
            </main>
            <footer>

            </footer>
        </>
    );
}
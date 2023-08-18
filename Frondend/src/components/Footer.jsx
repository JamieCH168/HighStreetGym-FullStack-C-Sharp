import React from 'react'

export default function Footer() {
    return (
        <footer className="footer p-10 bg-neutral text-neutral-content place-items-center text-xl min-[400px]:grid-flow-col">
            <div>
                <span className="footer-title">Services</span>
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Marketing</a>
            </div>
            <div>
                <span className="footer-title">Company</span>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
            </div>
            <div>
                <span className="footer-title">Legal</span>

                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </div>
        </footer>

    )
}

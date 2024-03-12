import { Link } from 'react-router-dom';
import logoImg from '../assets/inspired-weaver-logo-grayscale.png';

export default function Footer() {

  return (
    <div className="texture-v3 bg-primary ">
      <footer className="footer px-10 pt-10 pb-5 font-semibold">
        <nav>
          <h6 className="footer-title text-slate-900">Services</h6> 
          <Link to="/discover" className="link link-hover text-white hover:text-pink-600">Branding</Link>
          <Link to="/discover" className="link link-hover text-white hover:text-pink-600">Design</Link>
          <Link to="/discover" className="link link-hover text-white hover:text-pink-600">Marketing</Link>
          <Link to="/discover" className="link link-hover text-white hover:text-pink-600">Advertisement</Link>
        </nav> 
        <nav>
          <h6 className="footer-title text-slate-900">Company</h6> 
          <Link to="/" className="link link-hover text-white hover:text-pink-600">About us</Link>
          <Link to="/discover" className="link link-hover text-white hover:text-pink-600">Discover</Link>
          <Link to="/support" className="link link-hover text-white hover:text-pink-600">Support</Link>
          <Link to="/shop" className="link link-hover text-white hover:text-pink-600">Shop</Link>
        </nav> 
        <nav>
          <h6 className="footer-title text-slate-900">Legal</h6> 
          <Link to="/" className="link link-hover text-white hover:text-pink-600">Terms of use</Link>
          <Link to="/" className="link link-hover text-white hover:text-pink-600">Privacy policy</Link>
          <Link to="/" className="link link-hover text-white hover:text-pink-600">Cookie policy</Link>
        </nav>
      </footer> 
      <footer className="footer px-10 py-4 border-t text-slate-800 border-slate-800">
        <aside className="items-center grid-flow-col">
          <img src={logoImg} alt="" width="60" height="60"/>
          <p className="font-bold">Inspired Weaver Ltd. <br/>Styled inspired fashion since 2024</p>
        </aside> 
        <nav className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <Link to="/" className="cursor-pointer hover:text-pink-600"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></Link>
            <Link to="/" className="cursor-pointer hover:text-pink-600"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></Link>
            <Link to="/" className="cursor-pointer hover:text-pink-600"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></Link>
            <Link to="/" className="cursor-pointer hover:text-pink-600"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" className="fill-current"><path d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"></path></svg></Link>
            <Link to="/" className="cursor-pointer hover:text-pink-600"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" className="fill-current"><path d="M12,2C6.477,2,2,6.477,2,12c0,4.237,2.636,7.855,6.356,9.312c-0.087-0.791-0.167-2.005,0.035-2.868 c0.182-0.78,1.172-4.971,1.172-4.971s-0.299-0.599-0.299-1.484c0-1.391,0.806-2.428,1.809-2.428c0.853,0,1.265,0.641,1.265,1.408 c0,0.858-0.546,2.141-0.828,3.329c-0.236,0.996,0.499,1.807,1.481,1.807c1.777,0,3.143-1.874,3.143-4.579 c0-2.394-1.72-4.068-4.177-4.068c-2.845,0-4.515,2.134-4.515,4.34c0,0.859,0.331,1.781,0.744,2.282 c0.082,0.099,0.093,0.186,0.069,0.287c-0.076,0.316-0.244,0.995-0.277,1.134c-0.043,0.183-0.145,0.222-0.334,0.133 c-1.249-0.582-2.03-2.408-2.03-3.874c0-3.154,2.292-6.052,6.608-6.052c3.469,0,6.165,2.472,6.165,5.776 c0,3.447-2.173,6.22-5.189,6.22c-1.013,0-1.966-0.527-2.292-1.148c0,0-0.502,1.909-0.623,2.378 c-0.226,0.868-0.835,1.958-1.243,2.622C9.975,21.843,10.969,22,12,22c5.522,0,10-4.478,10-10S17.523,2,12,2z"></path></svg></Link>
          </div>
        </nav>
      </footer>
    </div>
  );
}
import React from 'react';
import { Link } from 'react-router-dom';
import { Footer, FooterDivider } from 'flowbite-react';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';

const Footercomp = () => {
  return (
   <Footer container className="border border-t-8  border-teal-500">
    <div className='w-full max-w-7xl mx-auto'>
    <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
    <div className='mt-5'>
    <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
          <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Geeta's</span>
          Blog
        </Link>
    </div>
    <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
        <div>
     <Footer.Title title="About"/>
     <Footer.LinkGroup col>
        <Footer.Link
        href="https://coolors.co/"
        target='_blank'
        rel='noopener noreferrer'                   //this noopener noreferrer code is for opening the link in another tab. 
        >
            My Projects
        </Footer.Link>
        <Footer.Link
        href="/about"
        target='_blank'
        rel='noopener noreferrer'                   //this noopener noreferrer code is for opening the link in another tab. 
        >
            Geeta's Blog
        </Footer.Link>
     </Footer.LinkGroup>
     </div>
     <div>
     <Footer.Title title="FOLLOW US"/>
     <Footer.LinkGroup col>
        <Footer.Link
        href="https://github.com/geetaneupane"
        target='_blank'
        rel='noopener noreferrer'                 
        >
            Git Hub
        </Footer.Link>
        <Footer.Link
        href="discordapp.com/users/849649425952538675"
        target='_blank'
        rel='noopener noreferrer'                  
        >
            Discord
        </Footer.Link>
     </Footer.LinkGroup>
     </div>
     <div>
     <Footer.Title title='LEGAL'/>
     <Footer.LinkGroup col>
        <Footer.Link
        href="#">
        Privacy Policy
        </Footer.Link>
        <Footer.Link
       href='#'
        >
            Terms &amp; Conditions
        </Footer.Link>
     </Footer.LinkGroup>
     </div>
    </div>
    </div>
    <FooterDivider/>             {/*It has divided the footer into separate parts! Look at the UI carefully! */}
    <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            href='#'
            by="Geeta's Blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href='https://www.facebook.com/geetu.neupane.92/' icon={BsFacebook}/>
            <Footer.Icon href='#' icon={BsInstagram}/>
            <Footer.Icon href='#' icon={BsTwitter}/>
            <Footer.Icon href='https://github.com/geetaneupane' icon={BsGithub}/>
            <Footer.Icon href='#' icon={BsDribbble}/>

          </div>
        </div>
    
    </div>
   </Footer>
  )
}

export default Footercomp

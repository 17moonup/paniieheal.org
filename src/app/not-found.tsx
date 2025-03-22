import Link from 'next/link';
import Image from 'next/image';
export default function NotFound() {
  return (
    <main>
      <Image 
       src={'/img/not-found.jpeg'}
       alt={'not found pic'}
       width={250}
       height={250}
       />
      <h2>404 Not Found</h2>  
        <p>Could not find the requested invoice.</p>
        <Link
          href="../"
        >
          Go Back
        </Link>
    </main>
  );
}
import { Button, Divider, Link } from "@mui/material";

export default function NotFound() {
  return (
    <main className="flex justify-center items-center w-full h-screen shadow-gradient">
      <div className="not-found-modal">
        <h1>404</h1>
        <img alt='banner' src={'/assets/404.png'} className="fade-down" />
        <p className="text-lg text-gray-500 mt-8 fade">Oops! The page you are looking for is not found.</p>
        <Divider style={{width:600, margin:"24px 0"}} flexItem />
        <Link href={'/'}>
          <Button color="primary" variant="contained" sx={{fontWeight:'bold',padding:"12px 20px"}}>Go to Homepage</Button>
        </Link>
      </div>
    </main>
  )
}
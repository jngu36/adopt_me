import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";

export default function Dogs() {
    return (
        <>
            <main className="body_full">
                <Link href="/">Back!</Link>
                <div className="container">
                    <div className="row">
                        <p className="col">Hello dog 1!</p>
                        <p className="col">Hello dog 2!</p>
                        <p className="col">Hello dog 3!</p>
                    </div>
                    <div className="row">

                        <p className="col">Hello dog 4!</p>
                        <p className="col">Hello dog 5!</p>
                        <p className="col">Hello dog 6!</p>
                    </div>
                </div>
            </main>
        </>
    );
}

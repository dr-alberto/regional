import { Button } from "../Button"
import { TextLink } from "../TextLink"
import 'animate.css';


export default function Header() {
    return (
        <div className="relative isolate px-2 lg:px-8 bg-[url('https://raw.githubusercontent.com/dr-alberto/assets/main/bg-pattern.svg')] bg-no-repeat bg-top">
            <div className="mx-auto max-w-2xl py-32 sm:py-38">
                <div className="flex flex-col items-center text-center py-14">
                    <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-gray-900 md:text-7xl animate__animated animate__fadeInDown">
                      Global expansion made seamless
                    </h1>
                    <p className="mt-6 text-xl leading-8 text-gray-600 animate__animated animate__fadeInDown">
                        Collect contact information from users in untapped regions and cultivate a pre-existing audience to simplify your launches into new markets.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Button text={'Get started'} url={'/register'}/>
                        <TextLink text={'Learn more'} url={'#solution'}/>
                    </div>
                    <div className='relative animate__animated animate__fadeIn'>
                        <div class="absolute bottom-0 left-0 right-0 h-32"></div>
                        <img
                            src="/preview.png"
                            alt="Product screenshot"
                            className="mt-10 sm:w-[78rem] sm:max-w-none rounded-md shadow-md ring-1 ring-teal-600/25"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
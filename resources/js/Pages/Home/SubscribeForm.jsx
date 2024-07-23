import { Envelope } from '@phosphor-icons/react'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
import { NewsletterTexts } from "../../Constants/dataLists"

export const SubscribeForm = () => {
    return (
        <form className='flex md:flex-row flex-col items-stretch gap-2'>
            <Input containerClass='relative' inputClass='bg-white border-none rounded-lg outline-none w-[300px] h-[50px] focus:outline-none text-aquadark color-aquadark pr-4 pl-9 py-1' type="email" placeholder={NewsletterTexts.placeholderText}>
                <div className='absolute top-4 left-3 text-aquadark'>
                    <Envelope size={18}   />
                </div>
            </Input>
            <Button type='submit' className='border-none outline-none bg-aquadark py-2 px-6 text-white font-light text-base rounded-lg'>
                {NewsletterTexts.buttonText}
            </Button>
        </form>
    )
}

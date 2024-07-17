import { Envelope } from '@phosphor-icons/react'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
import { NewsletterTexts } from "../../Constants/dataLists"

export const SubscribeForm = () => {
    return (
        <form className='flex md:flex-row flex-col items-stretch gap-2'>
            <Input containerClass='relative' inputClass='border-none rounded-lg outline-none w-[300px] h-[50px] focus:outline-none color-white pr-4 pl-9 py-1' type="email" placeholder={NewsletterTexts.placeholderText}>
                <div className='absolute top-4 left-3 text-color3/80'>
                    <Envelope size={18} color="currentColor" weight="fill" />
                </div>
            </Input>
            <Button type='submit' className='border-none outline-none bg-color1 py-2 px-6 text-white font-light text-base rounded-lg'>
                {NewsletterTexts.buttonText}
            </Button>
        </form>
    )
}

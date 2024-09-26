import { Control } from 'react-hook-form'
import { FormControl, FormField, FormLabel, FormItem as FormItemD, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

interface Props{
    label:string,
    placeholder:string,
    control:Control<any>,
    name:string,

}

export default function FormItem({label,placeholder,control,name}:Props) {
    return (
        <FormField
            
            control={control}
            name={name}
            render={({ field }) => (
                <FormItemD className=''>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItemD>
            )}
        />
    )
}

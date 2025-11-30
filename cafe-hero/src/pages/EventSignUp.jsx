import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { GoogleLogin } from '@react-oauth/google'
import jwtDecode from 'jwt-decode'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'

const formSchema = z.object({
  fullName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  age: z.string().optional(),
  instagramHandle: z.string().optional(),
  haveDoneBefore: z.string().optional(),
  dietaryPreference: z.string().optional(),
})

export default function EventSignUp({ eventConfig }) {
  const [isReturningUser, setIsReturningUser] = useState(false)
  const [userEmail, setUserEmail] = useState(null)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      age: '',
      instagramHandle: '',
      haveDoneBefore: '',
      dietaryPreference: '',
    },
  })

  useEffect(() => {
    const saved = localStorage.getItem('userProfile')
    if (saved) {
      const data = JSON.parse(saved)
      setIsReturningUser(true)
      form.reset({
        fullName: data.fullName || '',
        email: data.email || '',
        age: data.age || '',
        instagramHandle: data.instagramHandle || '',
        dietaryPreference: data.dietaryPreference || '',
      })
    }
  }, [form])

  const handleGoogleSuccess = (resp) => {
    try {
      const decoded = jwtDecode(resp.credential)
      setUserEmail(decoded.email)

      // For now: prefill name/email from Google. Replace with backend fetch if available.
      form.setValue('fullName', decoded.name || '')
      form.setValue('email', decoded.email || '')
    } catch (err) {
      console.warn('Google decode error', err)
    }
  }

  const shouldShowField = (fieldName) => {
    if (!isReturningUser) return true
    return eventConfig?.fields?.includes(fieldName) ?? true
  }

  const onSubmit = (data) => {
    const profile = {
      fullName: data.fullName,
      email: data.email,
      age: data.age,
      instagramHandle: data.instagramHandle,
      dietaryPreference: data.dietaryPreference,
    }
    localStorage.setItem('userProfile', JSON.stringify(profile))
    // TODO: submit to backend endpoint
    console.log('submit', { ...data, eventId: eventConfig?.id })
    alert('Submitted — check console (no backend configured)')
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] py-12">
      <div className="max-w-6xl mx-auto p-8">
        <div className="rounded-xl border-2 border-white/20 p-6">
          <div className="rounded-lg border-2 border-dashed border-white/60 p-10 bg-transparent">
            <h2 className="text-center text-3xl text-white font-medium mb-8">
              Sign up for {eventConfig?.name ?? '<Event>'}
            </h2>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Left poster area */}
              <div className="md:w-1/3 flex justify-center">
                <div className="w-64 h-96 bg-[#0b5c0b] rounded-2xl shadow-inner border-2 border-white/40 relative flex items-center justify-center">
                  <div className="text-white/90 text-center px-4">Poster of the Event (to be added)</div>
                  <div className="absolute inset-0 rounded-2xl pointer-events-none" />
                </div>
              </div>

              {/* Vertical divider and right column */}
              <div className="md:w-2/3 flex items-start">
                <div className="hidden md:block border-r-2 border-dashed border-white/40 mr-8 h-[420px]" />

                <div className="flex-1">
                  {/* Optional Google sign-in */}
                  {!userEmail && (
                    <div className="mb-4">
                      <p className="text-white/70 mb-2">Sign in with Google to auto-fill (optional)</p>
                      <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => {}} />
                    </div>
                  )}

                  {isReturningUser && (
                    <div className="mb-4 text-sm text-green-300">✓ We've pre-filled your details. Only new fields shown.</div>
                  )}

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-white">
                      {shouldShowField('fullName') && (
                        <FormField control={form.control} name="fullName" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Name</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Your name" className="bg-transparent border-b border-white/30 text-white focus:border-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      )}

                      {shouldShowField('email') && (
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Email</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="you@example.com" className="bg-transparent border-b border-white/30 text-white focus:border-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      )}

                      {shouldShowField('age') && (
                        <FormField control={form.control} name="age" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Age</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" placeholder="Your age" className="bg-transparent border-b border-white/30 text-white focus:border-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      )}

                      {shouldShowField('instagramHandle') && (
                        <FormField control={form.control} name="instagramHandle" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Instagram Handle</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="@handle" className="bg-transparent border-b border-white/30 text-white focus:border-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      )}

                      {/* Have you done this before? */}
                      <FormField control={form.control} name="haveDoneBefore" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Have you done this before?</FormLabel>
                          <FormControl>
                            <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-4">
                              <div className="flex items-center gap-2">
                                <RadioGroupItem value="yes" id="done-yes" />
                                <label htmlFor="done-yes" className="text-white">Yes</label>
                              </div>
                              <div className="flex items-center gap-2">
                                <RadioGroupItem value="no" id="done-no" />
                                <label htmlFor="done-no" className="text-white">No</label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )} />

                      <div className="flex gap-3 pt-2">
                        <Button type="submit" className="bg-white text-black">Submit</Button>
                        <Button type="button" variant="ghost" onClick={() => form.reset()} className="text-white/80">Clear</Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

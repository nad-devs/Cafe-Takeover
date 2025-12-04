import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EventSignup() {
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    instagram: "",
    hasDoneBefore: null, // true/false
  });



  const handleLoginToggle = () => {
    setIsReturningUser(!isReturningUser);
    // Reset form if switching to signup
    if (!isReturningUser) {
      setFormData({
        name: "",
        email: "",
        age: "",
        instagram: "",
        hasDoneBefore: null,
      });
    }
  };

  const handleInstagramChange = (e) => {
    let value = e.target.value;
    // Auto-prepend @ if user starts typing without it
    if (value.length > 0 && !value.startsWith("@")) {
      value = "@" + value;
    }
    setFormData({ ...formData, instagram: value });
  };

  const handleAgeChange = (e) => {
    const value = e.target.value;
    const age = parseInt(value);

    // Set custom validity message
    if (value === "" || isNaN(age)) {
      e.target.setCustomValidity("");
    } else if (age < 3) {
      e.target.setCustomValidity("You're not really 3 years old. C'mon be fr.");
    } else if (age > 110) {
      e.target.setCustomValidity("You're not really that old, are you?");
    } else {
      e.target.setCustomValidity("");
    }

    setFormData({ ...formData, age: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Browser will handle required field validation
    console.log("Form submitted:", formData);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div className="min-h-screen w-full bg-brand-offwhite flex items-center justify-center p-4 font-sans text-gray-900">
      {/* Main Container */}
      <motion.div
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Middle Partition Line (Desktop only) */}
        <motion.div
          className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 -translate-x-1/2"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {/* Left Column: Poster */}
        <motion.div
          className="flex flex-col items-center justify-center p-6"
          variants={itemVariants}
        >
          {/* Poster Placeholder */}
          <motion.div
            className="w-full max-w-sm aspect-3/4 bg-brand-red/10 border-2 border-brand-red rounded-lg flex items-center justify-center text-brand-red font-bold text-xl shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300"
            whileHover={{ scale: 1.02, rotate: 0 }}
            initial={{ rotate: -5, opacity: 0, x: -50 }}
            whileInView={{ rotate: -2, opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            Poster of the Event
            <br />
            (to be added)
          </motion.div>
        </motion.div>

        {/* Right Column: Form */}
        <motion.div
          className="flex flex-col justify-center p-6 space-y-6"
          variants={containerVariants}
        >
          <motion.div
            className="space-y-2 text-center md:text-left"
            variants={itemVariants}
          >
            <h1 className="text-3xl font-bold tracking-tight text-brand-red">
              Sign up for &lt;XYZ Event&gt;
            </h1>
            <p className="text-gray-600">
              {isReturningUser
                ? "Welcome back! Log in to autofill your details."
                : "Join us for an amazing experience!"}
            </p>
          </motion.div>

          {/* <motion.div className="relative" variants={itemVariants}>
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-brand-offwhite px-2 text-gray-500">
                Or continue with email
              </span>
            </div>
          </motion.div> */}

          {/* Form Element Wrapper */}
          <form onSubmit={handleSubmit}>
            {/* Form Fields */}
            <motion.div className="space-y-4" variants={containerVariants}>
              <motion.div className="space-y-2" variants={itemVariants}>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="bg-white/50 border-gray-300 focus:border-brand-red focus:ring-brand-red"
                  required
                />
              </motion.div>
              <motion.div className="space-y-2" variants={itemVariants}>
                <Label htmlFor="email">Email *</Label>
                <Input
                  required
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="bg-white/50 border-gray-300 focus:border-brand-red focus:ring-brand-red"
                  pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
                  title="Please enter a valid email address with a proper domain (e.g., user@example.com)"
                />
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                <motion.div className="space-y-2" variants={itemVariants}>
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={formData.age}
                    onChange={handleAgeChange}
                    className="bg-white/50 border-gray-300 focus:border-brand-red focus:ring-brand-red"
                    min={3}
                    max={110}
                    required
                  />
                </motion.div>
                <motion.div className="space-y-2" variants={itemVariants}>
                  <Label htmlFor="instagram">Instagram Handle *</Label>
                  <Input
                    id="instagram"
                    placeholder="@username"
                    value={formData.instagram}
                    onChange={handleInstagramChange}
                    className="bg-white/50 border-gray-300 focus:border-brand-red focus:ring-brand-red"
                    required
                    pattern="@.*"
                    title="Instagram handle must start with @"
                  />
                </motion.div>
              </div>

              <motion.div className="space-y-2" variants={itemVariants}>
                <Label>Have you done this before? *</Label>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={
                      formData.hasDoneBefore === true ? "default" : "outline"
                    }
                    className={
                      formData.hasDoneBefore === true
                        ? "bg-brand-red hover:bg-brand-red/90"
                        : ""
                    }
                    onClick={() =>
                      setFormData({ ...formData, hasDoneBefore: true })
                    }
                  >
                    Yes
                  </Button>
                  <Button
                    type="button"
                    variant={
                      formData.hasDoneBefore === false ? "default" : "outline"
                    }
                    className={
                      formData.hasDoneBefore === false
                        ? "bg-brand-red hover:bg-brand-red/90"
                        : ""
                    }
                    onClick={() =>
                      setFormData({ ...formData, hasDoneBefore: false })
                    }
                  >
                    No
                  </Button>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button
                  type="submit"
                  className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-bold py-3 mt-4"
                  disabled={formData.hasDoneBefore === null}
                >
                  {isReturningUser
                    ? "Update Registration"
                    : "Complete Registration"}
                </Button>
              </motion.div>
            </motion.div>
          </form>

          <motion.div className="text-center text-sm" variants={itemVariants}>
            <button
              onClick={handleLoginToggle}
              className="text-brand-red hover:underline font-medium"
            >
              {isReturningUser
                ? "New here? Sign up for the event"
                : "Already a Member?  Log in"}
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import faqs from "@/FAQs/faqs.json"; // Adjust the path according to your structure

export default function FaqsSection() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const handleToggle = (value: string) => {
    setOpenItem(openItem === value ? null : value);
  };

  return (
    <section className="bg-black text-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-white text-center font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">Frequently Asked Questions</h2>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={faq.question}
              className="border border-gray-700 rounded-lg overflow-hidden"
            >
              <AccordionTrigger
                onClick={() => handleToggle(faq.question)}
                className="flex justify-between items-center p-4 font-medium text-left text-lg hover:bg-[#1E1E1E] transition rounded-lg"
              >
                <span>{faq.question}</span>
                {openItem === faq.question ? (
                  <ChevronUp className="text-gray-300 cursor-pointer align-middle" size={24} />
                ) : (
                  <ChevronDown className="text-gray-300 cursor-pointer align-middle" size={24} />
                )}
              </AccordionTrigger>

              <AccordionContent className="p-4 text-gray-300 leading-relaxed bg-[#1E1E1E] rounded-b-lg">
                {faq.answer.split("\n").map((line, i) => (
                  <p key={i} className="mb-2 last:mb-0">
                    {line}
                  </p>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

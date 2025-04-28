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
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={faq.question}
              className="border border-gray-700 rounded-lg overflow-hidden"
            >
              <AccordionTrigger
                onClick={() => handleToggle(faq.question)}
                className="flex justify-between items-center p-4 font-medium text-left text-lg hover:bg-gray-800 transition rounded-lg"
              >
                <span>{faq.question}</span>
                {openItem === faq.question ? (
                  <ChevronUp className="w-5 h-5 text-green-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-green-400" />
                )}
              </AccordionTrigger>

              <AccordionContent className="p-4 text-gray-300 leading-relaxed bg-gray-900 rounded-b-lg">
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

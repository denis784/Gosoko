import React from 'react';

const faqs = [
  {
    question: 'What is JiKonnectsoko?',
    answer: 'JiKonnectsoko is an e-commerce platform developed by the Ministry of IC&DE through the ICT Authority for the public to help stimulate the digital economy by enabling SMEs to expand their customer reach and move their businesses online. JiKonnectsoko is a digital marketplace where buyers and sellers can interact and trade.',
  },
  {
    question: 'Is JiKonnectsoko available in all counties?',
    answer: 'JiKonnectsoko operates across the country and in all counties of Kenya and serves customers and businesses regardless of location or industry.',
  },
  {
    question: 'How do I create an account on JiKonnectsoko?',
    answer: 'To create an account, simply visit www.jikonnectsoko.go.ke/register  and follow the prompts to provide your details. You will need a valid email address and a password to get started.',
  },
  {
    question: 'How can I browse products on JiKonnectsoko without an account?',
    answer: 'You can easily browse products by using the search bar, category filters, or by exploring featured sections on the platform.',
  },
  {
    question: 'How do I place an order?',
    answer: 'Once you find the product you want to purchase, click on it to view the details and click the "Add to Cart" button. After selecting all the products you want to buy, go to your cart and follow the checkout steps to complete your order. This process requires one to be logged in to the account.',
  },
  {
    question: 'How can I contact customer support?',
    answer: 'You can reach our customer support team through the "Contact Us" section on our website or by emailing info@jikonnectsoko.go.ke.',
  },
  {
    question: 'Can I sell products on JiKonnectsoko?',
    answer: 'Yes, if you are a merchant/seller in Kenya, you can apply to become a vendor on JiKonnectsoko. Visit https://www.jikonnectsoko.go.ke/register page for more information on the vendor registration process.',
  },
  {
    question: 'How to create a business account?',
    answer: 'Create an account by visiting https://www.jikonnectsoko.go.ke/register, by providing all the required information, make sure to use a valid email address. After activating your account, login and on the dashboard click “Become a Merchant” Button, make sure you have your KRA PIN, National Id, and Business Permit. Fill in all the required fields and click submit.',
  },
  {
    question: 'Can I cancel my order?',
    answer: 'To cancel an order you can contact the merchant/business that you ordered from and request them to cancel the order placed.',
  },
  {
    question: 'What if I have a problem with my order?',
    answer: 'In case you have an issue with placing an order you can view the contact details of the business/merchant and contact them or you can contact JiKonnectsoko support through info@jikonnectsoko.go.ke.',
  },
  {
    question: 'Is my personal information secure?',
    answer: 'Your personal information is protected as indicated in our terms and conditions which can be accessed at https://www.jikonnectsoko.go.ke/terms&conditions',
  },
  {
    question: 'How will my order be shipped?',
    answer: 'The logistics of your order will be an agreement between you and the merchant/Business which will be agreed upon after placing an order.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'Various payment methods are available, depending on the Merchant, which you will discuss and come to an agreement.',
  },
];

const FAQs = () => {
  const faqStyle = {
    borderBottom: '1px solid #ccc',
    padding: '16px 0',
  };

  const questionStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
  };

  const answerStyle = {
    fontSize: '16px',
  };

  return (
    <div style={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Frequently Asked Questions (FAQs)</h1>
      {faqs.map((faq, index) => (
        <div key={index} style={faqStyle}>
          <div style={questionStyle}>{faq.question}</div>
          <div style={answerStyle}>{faq.answer}</div>
        </div>
      ))}
    </div>
  );
};

export default FAQs;

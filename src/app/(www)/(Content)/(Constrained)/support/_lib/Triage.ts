export const triagePages = {
    intro: {
        body: `
*Help Me Leave* helps people understand publicly-available information about migration and visas. We are not a licensed immigration advisory service, and nothing we provide is legal advice. 

You must make your own decision based on your circumstances, your preferences and the compromises you are willing to make. We do not advise, direct or encourage anyone to leave their home country. You choose whether to stay or to leave, which country to apply to, and when to act.

The *Help Me Leave* Support team is run by volunteers and has limited capacity. We focus on supporting the people who are at the **highest risk of harm right now** by helping them understand their options. This includes people who are: 
- Latino/Hispanic communities and Indigenous/Native Americans
- Brown, Black and undocumented immigrants 
- Black Americans
- Transgender people, intersex people and visibly queer or gender non-conforming people
- Disabled people

Please remember that we provide information and support, but we cannot guarantee that there will be a pathway that suits you. 

If you are not in one of these groups, your Support ticket response time will likely be delayed. You are still welcome to:

- Use the *Help Me Leave* website to find pathways [HelpmeleaveHML | Pathway Explorer](https://www.helpmeleave.us/explorer) 
- Use *Help Me Leave* resources and guides [HelpmeleaveHML | Guides & Resources](https://www.helpmeleave.us/guides-resources)
- Join our community Discord to support your research. [Join the *Help Me Leave* - Community Discord Server!](https://discord.gg/yt68AYNdt8) 
        
Do you understand how *Help Me Leave* can help you?
        `,
        choices: [
            {
                text: 'Yes',
                next: 'funding'
            },
            {
                text: 'No',
                next: 'redirect-about'
            },
        ]
    },
    'redirect-about': {
        redirect: '/our-mission'
    },
    funding: {
        body: `
Do you need direct support with funding for your move?
        `,
        choices: [
            {
                text: 'Yes',
                next: 'exit-funding'
            },
            {
                text: 'No',
                next: 'distress'
            },
        ]
    },
    'exit-funding': {
        body: `
*Help Me Leave* does not provide direct funding of any kind. Our mission is to provide our community with information, resources and advocacy. We recommend you join our Discord community for many useful resources, tips, and personal experiences navigating the financial strain of relocation. [Join the *Help Me Leave* - Community Discord Server!](https://discord.gg/yt68AYNdt8)
        `,
        choices: [
            {
                text: 'Start Over',
                next: 'intro'
            },
        ]
    },
    distress: {
        body: `
Are you experiencing significant emotional distress or a mental health crisis right now?
        `,
        choices: [
            {
                text: 'Yes',
                next: 'exit-distress'
            },
            {
                text: 'No',
                next: 'emergency'
            },
        ]
    },
    'exit-distress': {
        body: `
We understand that many people who contact *Help Me Leave* are under great stress. Our volunteers are not mental health professionals. 
What we can do:
- Listen with care
- Offer calm, supportive direction to resources and information
- Encourage you to seek appropriate professional help

What we **cannot** do:
- Provide therapy or counselling
- Give medical or psychological advice
- Replace professional care
- Provide financial aid

All support is provided with respect for privacy and confidentiality. Complex or high-risk situations may be escalated internally in accordance with safeguarding procedures. Responsibility for seeking professional or emergency support remains with the individual.

If you are in crisis, here is a list of resources available to U.S. residents that can provide mental health support.        
- [Trans Lifeline](https://translifeline.org/)
- [getselfhelp.co.uk](https://www.getselfhelp.co.uk/)
- [TWLOHA Mental Health Toolkit](https://twloha.com/mental-health-toolkit/)
- [Active Minds](https://activeminds.org/programs/)
- [NAMI](https://www.nami.org/)
- [SMART Recovery - Addiction Recovery Support](https://smartrecovery.org/)
- [Secular Therapy Project](https://www.seculartherapy.org/)
        `,
        choices: [
            {
                text: 'Start Over',
                next: 'intro'
            },
        ]
    },
    emergency: {
        body: `
Are you currently in a very unsafe environment at home, for example, because of domestic violence or unsafe housing?        
        `,
        choices: [
            {
                text: 'Yes',
                next: 'exit-emergency'
            },
            {
                text: 'No',
                next: 'form'
            },
        ]
    },
    'exit-emergency': { 
        body: `
*Help Me Leave* offers non-emergency support only. If you are in immediate danger or need to leave your environment right now, please contact local emergency services or local support organizations immediately to ensure your safety.

- [The National Coalition Against Domestic Violence](https://ncadv.org/)
- [Need Homeless Assistance?](https://www.hudexchange.info/housing-and-homeless-assistance/homeless-help/)
- [Client Challenge](https://justshelter.org/community-resources/)
        `,
        choices: [
            {
                text: 'Start Over',
                next: 'intro'
            },
        ]
    },
    form: {
        body: `
The role of *Help Me Leave* is to help you understand your options. Your options will be constrained by:
- Your financial circumstances
- Your job
- Whether you have family members or pets
- Immigration laws 

You may come to the conclusion that your options are too limited or you do not like the options that you have. You may decide that you want to remain in your country of origin. **That is also a valid choice.** We have collected resources and useful information for those choosing to stay.

**Contacting the *Help Me Leave* Support team**
If you would like to ask the HML Support Team for **information, guidance, or resources** about leaving your country, please fill in [our contact form](https://forms.clickup.com/90151711045/f/2kyqbwa5-195/251K9UAW6C3E3HIJIG)`
    }
}
export const config = {
    project: {
        name: "IT Pro Campus",
        slogan: "Empowering Minds, Unleashing Tech: Where IT Dreams Take Flight!",
        description:
            "At IT Pro Campus, we provide top-notch IT training and resources to help professionals excel in the rapidly evolving tech industry. From foundational concepts to advanced techniques, we are your one-stop destination for IT learning.",
        version: "1.0.0",
    },
    contact: {
        phoneNumbers: ["+1 (123) 456-7890", "+1 (098) 765-4321"],
        email: "info@itprocampus.com",
        address: "196 Bleecker St, New York, NY 10012, USA",
        website: "https://itprocampus.com",
        mapURL: "https://goo.gl/maps/aekRiJbXVYuqVMxp7",
        mapEmbedURL:
            "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3023.490731046204!2d-74.00457492439138!3d40.72922623656155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDDCsDQzJzQ1LjIiTiA3NMKwMDAnMDcuMiJX!5e0!3m2!1sen!2sgr!4v1691050244325!5m2!1sen!2sgr",
        socialMedia: {
            facebook: "https://www.facebook.com/ITProCampus",
            twitter: "https://twitter.com/ITProCampus",
            linkedin: "https://www.linkedin.com/company/itprocampus/",
            instagram: "https://www.instagram.com/itprocampus/",
            youtube: "https://www.youtube.com/c/ITProCampus",
        },
    },
    api: {
        baseUrl: "https://mycampusmates.com/app",
    },
    footerLinks: function () {
        return [
            {
                id: 1,
                heading: "Links",
                links: [
                    {
                        id: 1,
                        title: "Home",
                        link: "/",
                    },
                    {
                        id: 2,
                        title: "Courses",
                        link: "/courses",
                    },
                    {
                        id: 3,
                        title: "Events",
                        link: "/events",
                    },
                    {
                        id: 4,
                        title: "About",
                        link: "/about",
                    },
                    {
                        id: 5,
                        title: "Contact",
                        link: "/contact",
                    },
                ],
            },
            {
                id: 2,
                heading: "Social",
                links: [
                    {
                        id: 1,
                        title: "Facebook",
                        link: this.contact.socialMedia.facebook,
                    },
                    {
                        id: 2,
                        title: "Instagram",
                        link: this.contact.socialMedia.instagram,
                    },
                    {
                        id: 3,
                        title: "LinkedIn",
                        link: this.contact.socialMedia.linkedin,
                    },
                    {
                        id: 4,
                        title: "Twitter",
                        link: this.contact.socialMedia.twitter,
                    },
                    {
                        id: 5,
                        title: "YouTube",
                        link: this.contact.socialMedia.youtube,
                    },
                ],
            },
            {
                id: 3,
                heading: "Contact",
                links: [
                    {
                        id: 1,
                        title: this.contact.phoneNumbers[0],
                        link: `tel: ${this.contact.phoneNumbers[0]}`,
                    },
                    {
                        id: 2,
                        title: this.contact.phoneNumbers[1],
                        link: `tel: ${this.contact.phoneNumbers[1]}`,
                    },
                    {
                        id: 3,
                        title: this.contact.email,
                        link: `mailto: ${this.contact.email}`,
                    },
                    {
                        id: 4,
                        title: this.contact.address,
                        link: `https://www.google.com/maps/place/${this.contact.address}`,
                    },
                ],
            },
        ];
    },
    welcome: {
        description:
            "Through a combination of lectures, readings, discussions, students will gain a solid foundation in educational psychology.",
        list: [
            {
                id: 1,
                title: "Cutting-edge curriculum for the latest IT trends and technologies.",
            },
            {
                id: 2,
                title: "Expert instructors passionate about sharing their knowledge.",
            },
            {
                id: 3,
                title: "Hands-on training and real-world projects for practical experience.",
            },
            {
                id: 4,
                title: "Earn industry-recognized certifications for enhanced employability.",
            },
        ],
    },
};

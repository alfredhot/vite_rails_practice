export const Side = {
    template: require("@/views/layouts/side"),
    setup() {
        const menuList = [
            {
                name: "메인",
                icon: "fa-solid fa-house",
                path: "/",
                children: [],
            },{
                name: "컴포넌트",
                icon: "fa-solid fa-toggle-off",
                path: "/dev",
                children: [],
            },{
                name: '설정',
                icon: "fa-solid fa-sliders",
                path: "/admin",
                children: [
                    {
                        name: '메뉴설정',
                        icon: "fa-solid fa-sliders",
                        path: "/admin/menu"
                    },
                    {
                        name: "회원정보",
                        icon: "fa-solid fa-address-card",
                        path: "/admin/profile"
                    }
                ]
            }
        ]
        return { menuList }
    }
}
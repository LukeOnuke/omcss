//get verified role id for common servers
const GuildToRoleService = {
    data: [{
            guildId: 264801645370671114,
            roleId: 426156903555399680
        },
        {
            guildId: 972248042675773450,
            roleId: 983358950730780713
        },
        {
            guildId: 964645507962138624,
            roleId: 99094134838119634
        },
    ],
    getRoleFromGuild(g) {
        return this.data.find((server) => server.guildId == g).roleId;
    }
};
export default GuildToRoleService;
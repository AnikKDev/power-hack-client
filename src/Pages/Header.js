import React from 'react';

const Header = () => {
    return (
        <div class="navbar bg-gray-400 px-10">
            <div class="flex-1">
                <a class="btn btn-ghost normal-case text-xl">Power Hack</a>
            </div>
            <div class="flex-none">
                <ul class="menu menu-horizontal p-0">
                    <li>Paid Total: 0</li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
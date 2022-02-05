import React from "react";
import { BsChevronLeft } from "react-icons/bs";

const CalendarView = () => {
  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="font-semibold text-lg text-left">Bookings Calendar</h1>
      <div className="bg-white w-full rounded flex-col gap-2 shadow">
        <div className="flex gap-2 py-2 px-4 items-center justify-between">
          <div className="flex gap-1">
            <h1 className="font-bold text-slate-800">January</h1>
            <span className="text-slate-500">2022</span>
          </div>
          <div className="border border-slate-200 py-2 divide-x rounded flex items-center text-slate-600 font-semibold">
            <button className="px-2">
              <BsChevronLeft />
            </button>
            <button className="px-2">
              <BsChevronLeft className="rotate-180" />
            </button>
          </div>
        </div>
        <div className="grid grid-rows-7">
          <div className="grid grid-cols-7 h-24">
            <div className="border flex flex-col gap-1 py-1 px-2 relative">
              <span className="absolute top-1 w-full text-center text-slate-400 font-bold">
                MON
              </span>
            </div>
            <div className="border flex flex-col gap-1 py-1 px-2 relative">
              <span className="absolute top-1 w-full text-center text-slate-400 font-bold">
                TUE
              </span>
            </div>
            <div className="border flex flex-col gap-1 py-1 px-2 relative">
              <span className="absolute top-1 w-full text-center text-slate-400 font-bold">
                WED
              </span>
            </div>
            <div className="border flex flex-col gap-1 py-1 px-2 relative">
              <span className="absolute top-1 w-full text-center text-slate-400 font-bold">
                THU
              </span>
            </div>
            <div className="border flex flex-col gap-1 py-1 px-2 relative">
              <span className="absolute top-1 w-full text-center text-slate-400 font-bold">
                FRI
              </span>
            </div>
            <div className="border flex flex-col gap-1 py-1 px-2 relative">
              <span className="absolute top-1 w-full text-center text-slate-400 font-bold">
                SAT
              </span>
              <span>1</span>
            </div>
            <div className="border flex flex-col gap-1 py-1 px-2 relative">
              <span className="absolute top-1 w-full text-center text-slate-400 font-bold">
                SUN
              </span>
              <span>2</span>
            </div>
          </div>
          <div className="grid grid-cols-7 h-24">
            <div className="border flex flex-col gap-1 py-1 px-2 relative">
              <span>3</span>
            </div>
            <div className="border flex flex-col gap-1 py-1 px-2 relative">
              <span>4</span>
            </div>
            <div className="border flex flex-col gap-1 py-1 px-2 relative">
              <span>5</span>
            </div>
            <div className="border flex flex-col gap-1 py-1 px-2 relative">
              <span>6</span>
            </div>
            <div className="border flex flex-col gap-1 py-1 px-2 relative">
              <span>7</span>
            </div>
            <div className="border flex flex-col gap-1 py-1 px-2 relative">
              <span>8</span>
            </div>
            <div className="border flex flex-col gap-1 py-1 px-2 relative">
              <span>9</span>
            </div>
          </div>
          <div className="grid grid-cols-7 h-24">
            <div className="border flex flex-col gap-1 py-1 px-2 relative">
              <span>10</span>
            </div>
            <div className="border flex flex-col gap-1 py-1 px-2 relative">
              <span>11</span>
            </div>
            <div className="border flex flex-col gap-1 py-1 px-2 relative">
              <span>12</span>
            </div>
            <div className="border flex flex-col gap-1 py-1 px-2 relative">
              <span>13</span>
            </div>
            <div className="border flex flex-col gap-1 py-1 px-2 relative">
              <span>14</span>
            </div>
            <div className="border flex flex-col gap-1 py-1 px-2 relative">
              <span>15</span>
            </div>
            <div className="border flex flex-col gap-1 py-1 px-2 relative">
              <span>16</span>
            </div>
          </div>
          <div className="grid grid-cols-7 h-24">
            <div className="border flex flex-col gap-1 py-1 px-2 relative">
              <span>17</span>
            </div>
            <div className="border flex flex-col gap-1 py-1 px-2 relative">
              <span>18</span>
            </div>
            <div className="border flex flex-col gap-1 py-1 px-2 relative">
              <span>19</span>
            </div>
            <div className="border flex flex-col gap-1 py-1 px-2 relative">
              <span>20</span>
            </div>
            <div className="border flex flex-col gap-1 py-1 px-2 relative">
              <span>21</span>
            </div>
            <div className="border flex flex-col gap-1 py-1 px-2 relative">
              <span>22</span>
            </div>
            <div className="border flex flex-col gap-1 py-1 px-2 relative">
              <span>23</span>
            </div>
          </div>
          <div className="grid grid-cols-7 h-24">
            <div className="border flex flex-col gap-1 py-1 px-2 relative">
              <span>24</span>
            </div>
            <div className="border flex flex-col gap-1 py-1 px-2 relative">
              <span>25</span>
            </div>
            <div className="border flex flex-col gap-1 py-1 px-2 relative">
              <span>26</span>
            </div>
            <div className="border flex flex-col gap-1 py-1 px-2 relative">
              <span>27</span>
            </div>
            <div className="border flex flex-col gap-1 py-1 px-2 relative">
              <span>28</span>
            </div>
            <div className="border flex flex-col py-1 px-2 relative gap-1">
              <span>29</span>
              <div className="text-xs text-center rounded-full bg-blue-300">21:00 Gorka 3p</div>
              <div className="text-xs text-center rounded-full bg-blue-300">22:00 Julen 2p</div>
              <div className="text-xs text-center rounded-full bg-blue-300">+2</div>
            </div>
            <div className="border flex flex-col gap-1 py-1 px-2 relative">
              <span>30</span>
              <div className="text-xs text-center rounded-full bg-blue-300">12:30 Amaia 5p</div>
              <div className="text-xs text-center rounded-full bg-blue-300">13:30 Maria 6p</div>
            </div>
          </div>
          <div className="grid grid-cols-7 h-24">
            <div className="border flex flex-col gap-1 py-1 px-2 relative">
              <span>
                <span className="bg-green-400 rounded-full text-white p-1">
                  31
                </span>
              </span>
            </div>
            <div className="border flex flex-col gap-1 py-1 px-2 relative"></div>
            <div className="border flex flex-col gap-1 py-1 px-2 relative"></div>
            <div className="border flex flex-col gap-1 py-1 px-2 relative"></div>
            <div className="border flex flex-col gap-1 py-1 px-2 relative"></div>
            <div className="border flex flex-col gap-1 py-1 px-2 relative"></div>
            <div className="border flex flex-col gap-1 py-1 px-2 relative"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;

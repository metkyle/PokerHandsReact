using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PokerHandsReact.Models
{
    public class Card
    {
        public string name { get; set; }
        public string suit { get; set; }

        public string value { get; set; }

        public string numValue { get; set; }
    }
}

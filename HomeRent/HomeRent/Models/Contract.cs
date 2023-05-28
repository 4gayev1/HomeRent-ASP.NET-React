namespace HomeRent.Models
{
    public class Contract
    {
        public int ID { get; set; }
        public int Menzil_id { get; set; }
        public DateTime BashlamaTarix { get; set; }
        public DateTime BitmeTarix { get; set; }
        public string ad { get; set; }
        public string soyad { get; set; }
        public string qiymet { get; set; }
        public string status { get; set; }


    }
}
